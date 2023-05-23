export type TabProps = {
  label: string;
  id: string;
  'aria-controls': string;
};
export type TabsContainerProps = {
  tabsLabels: TabProps[];
  coach?: boolean;
};
