import { connect } from "react-redux";

import Alert from "./Alert";
import { State } from "../../types/store";

const mapStateToProps = ({ async }: State) => ({
  fetchErr: async.fetchErr,
});

export default connect(mapStateToProps)(Alert);
