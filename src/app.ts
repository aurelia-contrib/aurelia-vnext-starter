import { customElement } from '@aurelia/runtime';
import view from './app.html';
import nameTagView from './name-tag.html';

let id = 0;
class Todo {
  public done: boolean = false;
  public id: number = id++;
  constructor(public description: string, public app: App) {}
}

@customElement({
  name: 'app',
  templateOrNode: view,
  build: {
    required: true,
    compiler: 'default'
  },
  instructions: [],
  dependencies: []
})
export class App {
  public log: boolean = false;
  public count: number = 1;
  public description: string = 'Hello World';
  public todos: Todo[] = [];
  public firstName = 'John';
  public lastName = 'Doe';

  public nameTagInline = {
    templateOrNode: `<template>\${firstName} \${lastName} (from inline)</template>`,
    build: {
      required: true,
      compiler: 'default'
    },
    instructions: []
  };

  public nameTagWrapper = {
    templateOrNode: `<div><au-compose subject.bind="nameTagInline"></au-compose> (nested compose)</div>`,
    build: {
      required: true,
      compiler: 'default'
    },
    instructions: []
  };

  public nameTagHtml = {
    templateOrNode: nameTagView,
    build: {
      required: true,
      compiler: 'default'
    },
    instructions: []
  };

  public addTodo(): void {
    for (let i = 0; i < this.count; ++i) {
      this.todos.push(new Todo(this.description, this));
    }
  }

  public clearTodos(): void {
    this.todos.splice(0, this.todos.length);
  }

  public toggleTodos(): void {
    for (const todo of this.todos) {
      todo.done = !todo.done;
    }
  }

  public bound(): void {
    console.log('app bound');
  }

  public attaching(): void {
    console.log('app attaching');
  }

  public attached(): void {
    console.log('app attached');
  }

  public detaching(): void {
    console.log('app detaching');
  }

  public detached(): void {
    console.log('app detached');
  }

  public unbound(): void {
    console.log('app unbound');
  }
}
