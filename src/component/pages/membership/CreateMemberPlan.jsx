// import React, { useEffect, useState } from "react";
// import MainLayout from "../../layout/MainLayout";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   MenuItem,
//   Paper,
//   TextField,
//   Typography
// } from "@mui/material";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createMemberPlan,
//   getOneMemberPlan,
//   updateMemberPlan,
//   clearCurrentPlan
// } from "../../../redux/slice/memberShipSlice";

// function CreateMemberPlan() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { loading, currentPlan } = useSelector(
//     (state) => state.memberPlan
//   );

//   const query = new URLSearchParams(location.search);
//   const id = query.get("id");
//   const isEdit = !!id;

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     durationValue: "",
//     durationUnit: "MONTH",
//     benefits: [],
//     isActive: true
//   });

//   useEffect(() => {
//     if (isEdit) {
//       dispatch(getOneMemberPlan(id));
//     } else {
//       dispatch(clearCurrentPlan());
//     }
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (!currentPlan) return;

//     setForm({
//       name: currentPlan.name || "",
//       description: currentPlan.description || "",
//       price: currentPlan.price || "",
//       durationValue: currentPlan.durationValue || "",
//       durationUnit: currentPlan.durationUnit || "MONTH",
//       benefits: (currentPlan.benefits || []).map((item) =>
//         item.replace(/^"+|"+$/g, "")
//       ),
//       isActive: currentPlan.isActive
//     });
//   }, [currentPlan]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleBenefitChange = (e) => {
//     setForm((prev) => ({
//       ...prev,
//       benefits: e.target.value
//         .split(",")
//         .map((item) => item.trim())
//         .filter((item) => item)
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       name: form.name.trim(),
//       description: form.description.trim(),
//       price: Number(form.price),
//       durationUnit: form.durationUnit,
//       durationValue:
//         form.durationUnit === "LIFETIME"
//           ? null
//           : Number(form.durationValue),
//       benefits: form.benefits,
//       isActive: form.isActive
//     };

//     try {
//       if (isEdit) {
//         await dispatch(
//           updateMemberPlan({
//             id,
//             data: payload
//           })
//         ).unwrap();
//       } else {
//         await dispatch(createMemberPlan(payload)).unwrap();
//       }

//       navigate("/member-plan");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <MainLayout>
//       <Paper sx={{ maxWidth: 700, mx: "auto", p: 4 }}>
//         <Typography variant="h5" fontWeight={600} mb={3}>
//           {isEdit ? "Update Membership Plan" : "Create Membership Plan"}
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             label="Plan Name"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             margin="normal"
//             required
//           />

//           <TextField
//             fullWidth
//             multiline
//             rows={3}
//             label="Description"
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             margin="normal"
//           />

//           <TextField
//             fullWidth
//             type="number"
//             label="Price"
//             name="price"
//             value={form.price}
//             onChange={handleChange}
//             margin="normal"
//             required
//           />

//           <TextField
//             fullWidth
//             select
//             label="Duration Unit"
//             name="durationUnit"
//             value={form.durationUnit}
//             onChange={handleChange}
//             margin="normal"
//           >
//             <MenuItem value="MONTH">Month</MenuItem>
//             <MenuItem value="YEAR">Year</MenuItem>
//             <MenuItem value="LIFETIME">Lifetime</MenuItem>
//           </TextField>

//           {form.durationUnit !== "LIFETIME" && (
//             <TextField
//               fullWidth
//               type="number"
//               label="Duration Value"
//               name="durationValue"
//               value={form.durationValue}
//               onChange={handleChange}
//               margin="normal"
//               required
//             />
//           )}

//           {isEdit && (
//             <TextField
//               fullWidth
//               select
//               label="Status"
//               margin="normal"
//               value={form.isActive ? "true" : "false"}
//               onChange={(e) =>
//                 setForm((prev) => ({
//                   ...prev,
//                   isActive: e.target.value === "true"
//                 }))
//               }
//             >
//               <MenuItem value="true">Active</MenuItem>
//               <MenuItem value="false">Inactive</MenuItem>
//             </TextField>
//           )}

//           <TextField
//             fullWidth
//             multiline
//             rows={4}
//             label="Benefits (Comma Separated)"
//             value={form.benefits.join(", ")}
//             onChange={handleBenefitChange}
//             margin="normal"
//             helperText="Example: Free Consultation, 20% Discount, Priority Support"
//           />

//           <Box mt={3} display="flex" gap={2}>
//             <Button
//               variant="outlined"
//               onClick={() => navigate("/member-plan")}
//             >
//               Cancel
//             </Button>

//             <Button
//               type="submit"
//               variant="contained"
//               disabled={loading}
//             >
//               {loading ? (
//                 <CircularProgress size={22} color="inherit" />
//               ) : isEdit ? (
//                 "Update Plan"
//               ) : (
//                 "Create Plan"
//               )}
//             </Button>
//           </Box>
//         </form>
//       </Paper>
//     </MainLayout>
//   );
// }

// export default CreateMemberPlan;


import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  Paper,
  Switch,
  TextField,
  Typography
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createMemberPlan,
  getOneMemberPlan,
  updateMemberPlan,
  clearCurrentPlan
} from "../../../redux/slice/memberShipSlice";

function CreateMemberPlan() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, currentPlan } = useSelector(
    (state) => state.memberPlan
  );

  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    durationValue: "",
    durationUnit: "MONTH",
    benefits: [],
    isActive: true
  });

  useEffect(() => {
    if (isEdit) {
      dispatch(getOneMemberPlan(id));
    } else {
      dispatch(clearCurrentPlan());
      setForm({
        name: "",
        description: "",
        price: "",
        durationValue: "",
        durationUnit: "MONTH",
        benefits: [],
        isActive: true
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentPlan && isEdit) {
      setForm({
        name: currentPlan.name || "",
        description: currentPlan.description || "",
        price: currentPlan.price || "",
        durationValue: currentPlan.durationValue || "",
        durationUnit: currentPlan.durationUnit || "MONTH",
        benefits: (currentPlan.benefits || []).map((item) =>
          item.replace(/^"+|"+$/g, "")
        ),
        isActive: currentPlan.isActive ?? true
      });
    }
  }, [currentPlan, isEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleBenefitChange = (e) => {
    setForm({
      ...form,
      benefits: e.target.value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      durationValue:
        form.durationUnit === "LIFETIME"
          ? null
          : Number(form.durationValue),
      durationUnit: form.durationUnit,
      benefits: form.benefits,
      isActive: form.isActive
    };

    try {
      if (isEdit) {
        await dispatch(
          updateMemberPlan({
            id,
            data: payload
          })
        ).unwrap();
      } else {
        await dispatch(createMemberPlan(payload)).unwrap();
      }

      navigate("/member-plan");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <Paper sx={{ maxWidth: 700, mx: "auto", p: 4 }}>
        <Typography variant="h5" fontWeight={600} mb={3}>
          {isEdit ? "Update Membership Plan" : "Create Membership Plan"}
        </Typography>

        <form onSubmit={handleSubmit}>

          <TextField
            fullWidth
            required
            margin="normal"
            label="Plan Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            margin="normal"
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            required
            type="number"
            margin="normal"
            label="Price"
            name="price"
            value={form.price}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            select
            margin="normal"
            label="Duration Unit"
            name="durationUnit"
            value={form.durationUnit}
            onChange={handleChange}
          >
            <MenuItem value="MONTH">
              Month
            </MenuItem>

            <MenuItem value="QUARTER">
              Quarter
            </MenuItem>

            <MenuItem value="YEAR">
              Year
            </MenuItem>

            <MenuItem value="LIFETIME">
              Lifetime
            </MenuItem>
          </TextField>

          {form.durationUnit !== "LIFETIME" && (
            <TextField
              fullWidth
              required
              type="number"
              margin="normal"
              label="Duration Value"
              name="durationValue"
              value={form.durationValue}
              onChange={handleChange}
            />
          )}

          <TextField
            fullWidth
            multiline
            rows={4}
            margin="normal"
            label="Benefits (Comma Separated)"
            value={form.benefits.join(", ")}
            onChange={handleBenefitChange}
            helperText="Example: Free Consultation, 20% Discount, Priority Support"
          />

          {isEdit && (
            <FormControlLabel
              sx={{ mt: 2 }}
              control={
                <Switch
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isActive: e.target.checked
                    })
                  }
                />
              }
              label={form.isActive ? "Active" : "Inactive"}
            />
          )}

          <Box mt={3} display="flex" gap={2}>
            <Button
              variant="outlined"
              onClick={() => navigate("/member-plan")}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={22} />
              ) : isEdit ? (
                "Update Plan"
              ) : (
                "Create Plan"
              )}
            </Button>
          </Box>

        </form>
      </Paper>
    </MainLayout>
  );
}

export default CreateMemberPlan;