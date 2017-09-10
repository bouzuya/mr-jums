import { MenuCommand } from '../../command';
import { focus as entryViewerFocus } from '../../model/entry-viewer';
import { State } from '../../type/state';

const menu = (state: State, command: MenuCommand): State => {
  const { entryViewer } = state;
  return Object.assign({}, state,
    { focus: 'entry-list' },
    typeof command.entryId === 'undefined'
      ? {}
      : { entryViewer: entryViewerFocus(entryViewer, command.entryId) }
  );
};

export { menu };
