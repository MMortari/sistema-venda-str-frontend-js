import moment from 'moment';

const DataMask = ({ format = "DD/MM/YYYY HH:mm:ss", children }) => moment(children).format(format);

export default DataMask;