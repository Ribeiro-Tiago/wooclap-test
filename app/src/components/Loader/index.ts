import { connect } from "react-redux";

import Loader from "./Loader";
import { State } from "../../types/store";

const mapStateToProps = ({ async }: State) => ({
  isFetching: async.isFetching,
});

export default connect(mapStateToProps)(Loader);
