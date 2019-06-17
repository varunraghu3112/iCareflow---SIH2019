import {Navigation} from 'react-native-navigation'

export const nav = {
  modal: (screen, props, title) => {
    Navigation.showModal({
      stack: {
        children: [{
          component: {
            name: screen,
            passProps: {
              ...props
            },
            options: {
              topBar: {
                title: {
                  text: title
                }
              }
            }
          }
        }]
      }
    });
  },
  push : (id, screen, props, title) => {
    Navigation.push(id, {
      component: {
        name: screen,
        passProps: {
          ...props
        },
        options: {
          topBar: {
            title: {
              text: title
            }
          }
        }
      }
    });
  },
  overlay : (screen, props) => {
    Navigation.showOverlay({
      component: {
        name: screen,
        options: {
          overlay: {
            interceptTouchOutside: false
          }
        },
        passProps: {
          ...props
        }
      }
    });
  },
  pop: (id) => {
    Navigation.pop(id);
  },

  popToRoot: (id) => {
    Navigation.popToRoot(id);
  },

  dismissModal: (id) => {
    Navigation.dismissModal(id)
  },

  dismissOverlay: (id) => {
    Navigation.dismissOverlay(id);
  },

  mergeOptions: (id, options) => {
    Navigation.mergeOptions(id, {
      ...options
    });
  }
}



