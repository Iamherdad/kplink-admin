export interface IAppProps {
  id: string;
  app_id: string;
  app_resource: string;
  create_at: string;
  description: string;
  icon: string;
  name: string;
  start_path: string;
  start_type: string;
  update_at: string;
  version: string;
  update_desc: string;
}

export interface IAppParameterProps {
  open: boolean;
  onClose: () => void;
  data: IAppProps;
}

interface IDataItem {
  label: string;
  value: string;
}

export interface IAppDataMapProps {
  data: IDataItem[];
}
