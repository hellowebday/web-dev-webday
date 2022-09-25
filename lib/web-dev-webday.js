'use babel';

import WebDevWebdayView from './web-dev-webday-view';
import { CompositeDisposable } from 'atom';

export default {

  webDevWebdayView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.webDevWebdayView = new WebDevWebdayView(state.webDevWebdayViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.webDevWebdayView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'web-dev-webday:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.webDevWebdayView.destroy();
  },

  serialize() {
    return {
      webDevWebdayViewState: this.webDevWebdayView.serialize()
    };
  },

  toggle() {
    console.log('WebDevWebday was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
