import ReactGA from 'react-ga';

export const gaButtonHandler = () => {
  const buttons = document.querySelectorAll('a[id^="btn_"], button[id^="btn_"]');
  buttons.forEach(button => {
    const buttonId = button.id;
    const eventName = button.getAttribute('data-event-name');
    if(!eventName) {
      console.warn(`${buttonId} : data-event-name is not defined`);
      return;
    }
    button.addEventListener('click', function (event) {
      console.log(`${buttonId} was clicked`);
      ReactGA.event({
        category: 'Button',
        action: eventName,
        label: buttonId,
      });
    });
  })
};

export const initializeGA = (trackingId: string) => {
  console.info(`Initializing GA with tracking ID: ${trackingId}`);
  ReactGA.initialize(trackingId);
};

export const reportPageView = (path: string) => {
  console.info(`Reporting page view for path: ${path}`);
  ReactGA.set({ page: path });
  ReactGA.pageview(path);
};
