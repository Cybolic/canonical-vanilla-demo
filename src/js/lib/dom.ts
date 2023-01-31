// Since we're using the vanilla CSS framework, let's also use a vanilla JS (TS) framework

type TagName = string | null;
type Element = HTMLElement | Text;

type CreateElementProps = {
  [property: string]: unknown;
  children?: Array<Element | [tag: TagName, props: CreateElementProps]>;
  className?: string;
  text?: string;
};

type CreateElementReturn<T> = T extends string
  ? HTMLElement
  : T extends null
  ? Text
  : never;

// Create an element, and append it to the target if given.
// Supports nested elements through `children`. They can either be an array of
// `createElement` arguments or a DOM element.
export const createElement = <T extends TagName>(
  tag: T,
  props: CreateElementProps,
  target?: HTMLElement,
): CreateElementReturn<T> => {
  if (tag === null) {
    return document.createTextNode(props.text || '') as CreateElementReturn<T>;
  }

  const children: Array<HTMLElement | Text> = [];
  const element = document.createElement(tag as unknown as string);

  if (props.text !== undefined) {
    element.textContent = props.text;
    delete props.text;
  }

  if (props.children !== undefined) {
    for (const child of props.children) {
      let childElement: HTMLElement | Text;
      if (child instanceof HTMLElement || child instanceof Text) {
        childElement = child;
      } else if (Array.isArray(child)) {
        const [childTag, childProps] = child;
        childElement = createElement(childTag, childProps);
      } else {
        console.warn('Invalid child. Ignored:', child);
        continue;
      }

      children.push(childElement);
    }

    for (const child of children) {
      element.appendChild(child);
    }

    delete props.children;
  }

  for (const [property, value] of Object.entries(props)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (element as any)[property as keyof HTMLElement] = value;
  }

  if (target !== undefined) {
    target.appendChild(element);
  }

  return element as CreateElementReturn<T>;
};
