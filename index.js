class Block {
  constructor(id) {
    this.id = id;
    this.element = document.createElement("div");
    this.element.className = "block";
    this.element.textContent = `Блок ${id}`;
  }
  getElement() {
    return this.element;
  }
}

class Container {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.blocks = [];
    this.hiddenBLocks = [];
    this.blockCounter = 0;
  }
  addBlock() {
    const newBlockId = this.blocks.length + this.hiddenBLocks.length + 1;
    const newBlock = new Block(newBlockId);
    this.blocks.push(newBlock);
    this.containerElement.appendChild(newBlock.getElement());
    if (this.blocks.length > 5) {
      const hiddenBlock = this.blocks.shift();
      this.hiddenBLocks.push(hiddenBlock);
      this.containerElement.removeChild(hiddenBlock.getElement());
    }
  }
  removeBlock() {
    if (this.blocks.length === 0) return;
    const blockToRemove = this.blocks.pop();
    this.containerElement.removeChild(blockToRemove.getElement());
    if (this.blocks.length < 5 && this.hiddenBLocks.length > 0) {
      const blockToShow = this.hiddenBLocks.pop();
      this.blocks.unshift(blockToShow);
      this.containerElement.insertBefore(
        blockToShow.getElement(),
        this.containerElement.firstChild
      );
    }
  }
}

const containerElement = document.getElementById("container");
const container = new Container(containerElement);

document
  .getElementById("addBtn")
  .addEventListener("click", () => container.addBlock());

document
  .getElementById("removeBtn")
  .addEventListener("click", () => container.removeBlock());
