import { connect } from "react-redux";

import Home from "./Home";
import { updateCurrent } from "../../store/actions/movies";

const mapDispatchToProps = (dispatch: Function) => ({
  clearCurrentMovie: () => dispatch(updateCurrent()),
});

export default connect(null, mapDispatchToProps)(Home);
