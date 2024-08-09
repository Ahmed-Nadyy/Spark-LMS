import { useSelector } from "react-redux";
import Dash from "../dash/Dash";

const Dashboard = () => {
  const showQuizzies = useSelector((state) => state.quizzies.isQuizzies);
  return (
    <>
      <div className="container-fluid">
        <div className="row mt-3 h-100 ">
          <Dash />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
