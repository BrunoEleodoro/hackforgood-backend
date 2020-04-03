import React from 'react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider, styled, DarkTheme } from 'baseui';
import { StatefulInput } from 'baseui/input';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Home from './pages/home/Home';

const engine = new Styletron();

function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Home />
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
