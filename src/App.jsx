import Button from "@mui/material/Button";
import { Routes, Route } from "react-router-dom"
import DashboardMain from "./component/pages/dashboard/DashboardMain";
import UserMain from "./component/pages/user/UserMain";
import Home from "./component/common/Home";
import ProtectRoute from "./utils/ProtectRoute";
import UserDetail from "./component/pages/user/UserDetail";
import ContactMain from "./component/pages/contact/ContactMain";
import ContactDetail from "./component/pages/contact/ContactDetail";
import EventMain from "./component/pages/event/EventMain";
import SalaryMain from "./component/pages/salary/SalaryMain";
import SaleMain from "./component/pages/sales/SaleMain";
import PartnerMain from "./component/pages/partner/PartnerMain";
import Expansemain from "./component/pages/expanseManage/Expansemain";
import AddPartner from "./component/pages/partner/AddPartner";
import Update from "./component/pages/partner/Update";
import Adddoctor from "./component/pages/partner/Adddoctor";
import BlogMain from "./component/pages/blog/BlogMain";
import AddBlog from "./component/pages/blog/AddBlog";
import UpdateBlog from "./component/pages/blog/UpdateBlog";
import CareerMain from "./component/pages/career/CareerMain";
import JobMain from "./component/pages/career/JobMain";
import CreateJob from "./component/pages/career/CreateJob";
import ViewApplicant from "./component/pages/career/ViewApplicant";
import ViewJob from "./component/pages/career/ViewJob";
import Department from "./component/pages/coordinator/Department";
import Role from "./component/pages/coordinator/Role";
import State from "./component/pages/coordinator/State";
import District from "./component/pages/coordinator/District";
import Taluka from "./component/pages/coordinator/Taluka";
import Village from "./component/pages/coordinator/Village";
import MemberPlanMain from "./component/pages/membership/MemberPlanMain";
import CreateMemberPlan from "./component/pages/membership/CreateMemberPlan";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/f" element={<DashboardMain />} /> */}
     


        <Route element={<ProtectRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/f" element={<DashboardMain />} />
          <Route path="/user" element={<UserMain />} />
          <Route path="/user/:id" element={<UserDetail/>}/>
          <Route path="/contact" element={<ContactMain/>}/>
          <Route path="/contact/:id" element={<ContactDetail/>}/>

          <Route path="/event" element={<EventMain/>}/>
          <Route path="/salary" element={<SalaryMain/>}/>
          <Route path="/Sale" element={<SaleMain/>}/>
          <Route path="/partner" element={<PartnerMain/>}/>
          <Route path="/partner/add" element={<AddPartner/>}/>
          <Route path="/partner/update/:id" element={<Update/>}/>
          <Route path="/add/doctore/:id" element={<Adddoctor/>}/>
          <Route path="/expanse" element={<Expansemain/>}/>

          <Route path="/blog" element={<BlogMain/>}/>
          <Route path="/blog/create" element={<AddBlog/>}/>
          <Route path="/blog-update/:id" element={<UpdateBlog/>}/>

          <Route path="/career" element={<CareerMain/>}/>
          <Route path="/open-job" element={<JobMain/>}/>
          <Route path="/one-job/:id" element={<ViewJob/>}/>

          <Route path="/new-opening" element={<CreateJob/>}/>

          <Route path="/view/:id" element={<ViewApplicant/>}/>


          {/* cor-ordinator */}
          <Route path="/department" element={<Department/>}/>
          <Route path="/role/:id" element={<Role/>}/>
          <Route path="/state" element={<State/>}/>
          <Route path="/district" element={<District/>}/>
          <Route path="/taluka" element={<Taluka/>}/>
          <Route  path="/village" element={<Village/>}/>

          {/* member ship */}
          <Route path="/member-plan" element={<MemberPlanMain/>}/>
          <Route path="/member-plan/create" element={<CreateMemberPlan/>}/>
           

        </Route>



      </Routes>




    </>
  );
}

export default App;