interface removeAllClassNameProps {
  parentNode: ParentNode;
  selector: string;
  className: string;
}

const removeAllClassName = ({
  parentNode,
  selector,
  className,
}: removeAllClassNameProps) => {
  parentNode.querySelectorAll(selector).forEach((element) => {
    element.classList.remove(className);
  });
};

export default removeAllClassName;
