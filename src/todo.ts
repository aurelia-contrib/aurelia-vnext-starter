import { bindable, customElement } from "@aurelia/runtime";
import view from "./todo.html";
import { App } from "./app";

let id = 0;
export class TodoItem {
  public done: boolean = false;
  public id: number = id++;
  constructor(public description: string, public app: App) {}
}


@customElement({
  name: 'todo',
  templateOrNode: view,
  build: {
    required: true,
    compiler: 'default'
  },
  instructions: []
})
export class Todo {
  @bindable()
  public item: TodoItem;
}
