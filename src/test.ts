import { customElement } from "@aurelia/runtime";
import view from "./test.html";

// move along nothing to see here

@customElement({
  name: 'test',
  templateOrNode: view,
  build: {
    required: true,
    compiler: 'default'
  },
  instructions: [],
})
export class Test{
  public static lockScope = () => {}; // ??
}
