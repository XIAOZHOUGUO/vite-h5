import { App } from "vue";
import { Button, Form, Field, Cell, Calendar } from "vant";

const components = [Button, Form, Field, Cell, Calendar];
export function setupVant(app: App<Element>) {
  components.forEach(component => app.use(component));
}
