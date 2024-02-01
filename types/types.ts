export interface IChambermaid {
  id: number;
  name: string;
  hotelName: string;
  free: Object[];
}

export interface IGetHouseKepper {
  rangeTime: number[];
  name: string;
}

export interface IHotel {
  id: string;
  titleTask: string;
  name: string;
  duration: {
    start: number;
    end: number;
  };
  deadline: number;
  chambermaid: string;
}

export interface IAppState {
  chambermaidReducer: {
    chambermaid: IChambermaid[];
    hotels: IHotel[];
  };
}
