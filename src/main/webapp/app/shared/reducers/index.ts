import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
// prettier-ignore
import valinorOptions, {
  ValinorOptionsState
} from 'app/entities/valinor-options/valinor-options.reducer';
import visualization, { VisualizationState } from 'app/modules/visualization/visualization.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;

  readonly valinorOptions: ValinorOptionsState;
  readonly visualization: VisualizationState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  applicationProfile,
  administration,
  valinorOptions,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  visualization,
  loadingBar
});

export default rootReducer;
