import { createContext } from 'react';

const ExampleContext = createContext({
  showDrawer: false,
  toggleExampleDrawer: () => {}
});

export default ExampleContext;
