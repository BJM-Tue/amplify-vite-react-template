const genUrl = (...path: string[]) => path.join('/');

const ROOT_DASHBOARD = '';
const DASHBOARD_PATH = {
  ROOT: ROOT_DASHBOARD,
  CHAT: {
    PATH: 'chat',
    URL: genUrl(ROOT_DASHBOARD, 'chat'),
  },
};

export { DASHBOARD_PATH };
