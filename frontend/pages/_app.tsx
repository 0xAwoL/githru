import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/modules';
import '../src/index.css';
import '../src/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/components/container/SidePanelContentUnit.css';
import '../src/components/ValueSlider.css';
import '../src/components/UserInterests.css';
import '../src/components/TemporalSelector.css';
import '../src/components/TemporalFilter.css';
import '../src/components/PreferenceSliders.css';
import '../src/components/ManageParameter.css';
import '../src/components/InformationFragments.css';
import '../src/components/DetailCompare.css';
import '../src/components/CaptureTab.css';

// Create Redux store
const store = createStore(
  reducers,
  typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION__ 
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    : undefined
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
