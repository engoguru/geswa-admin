import React, { useMemo, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Divider,
  CircularProgress,
  Input,
} from "@mui/material";

import JoditEditor from "jodit-react";
import { useDispatch } from "react-redux";
import { createBlog } from "../../../redux/slice/blogSlice";

function AddBlog() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
 const [preview, setPreview] = useState(null)

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    file:null,
    metaTitle: "",
    metaDescription: "",
  });

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Write your blog content...",
      height: 500,
    }),
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleFile=(e)=>{

    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        file: file,
      }));
        setPreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleContentChange = (newContent) => {
    setForm((prev) => ({ ...prev, content: newContent }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData()


      // TODO: API call here
      formData.append("title", form.title)
      formData.append("excerpt", form.excerpt)
      formData.append("content", form.content)
      formData.append("metaTitle", form.metaTitle)
      formData.append("metaDescription", form.metaDescription)
      formData.append("file",form.file)



      // simulate success
      const submit = await dispatch(createBlog(formData)).unwrap()

      alert("Blog published successfully!");

      setForm({
        title: "",
        excerpt: "",
        content: "",
        metaTitle: "",
        metaDescription: "",
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Box sx={{ maxWidth: 1100, mx: "auto", p: { xs: 2, md: 4 } }}>
        {/* Header */}
        <Box mb={3}>
          <Typography variant="h4" fontWeight={700}>
            Add New Blog
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create and publish your blog post with SEO optimization
          </Typography>
        </Box>

        <Card elevation={4} sx={{ borderRadius: 3 }}>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Title */}
                <Grid container item size={{ xs: 12, sm: 6, md: 4 }}>
                  <TextField
                    fullWidth
                    label="Blog Title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                {/* Excerpt */}
                <Grid container item size={{ xs: 12, sm: 6, md: 8 }}>
                  <TextField
                    fullWidth
                    label="Excerpt"
                    name="excerpt"
                    value={form.excerpt}
                    onChange={handleChange}
                    multiline
                    rows={2}
                  />
                </Grid>
                {/* file */}
                         <Grid item xs={12} sx={{ display: "flex", marginBottom: "60px" }} >
                                <Input
                                  fullWidth
                                  type="file"
                                  name="doctorImage"
                                  inputProps={{ accept: "image/*" }}
                                  onChange={handleFile}
                                  required
                                />
                
                                {preview && (
                                  <Box sx={{ mt: 0, textAlign: "center" }} spacing={5}>
                
                
                                    <img
                                      src={preview}
                                      alt="Doctor Preview"
                                      style={{
                                        maxWidth: "100%",
                                        maxHeight: 80,
                                        borderRadius: 4,
                                      }}
                                    />
                                  </Box>
                                )}
                
                              </Grid>

                {/* Content Editor */}
                <Grid item xs={12}>
                  <Typography fontWeight={600} mb={1}>
                    Content
                  </Typography>

                  <Box
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <JoditEditor
                      value={form.content}
                      config={config}
                      onBlur={handleContentChange}
                    />
                  </Box>
                </Grid>


                {/* SEO */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="h6" fontWeight={600}>
                    SEO Settings
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Meta Title"
                    name="metaTitle"
                    value={form.metaTitle}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Meta Description"
                    name="metaDescription"
                    value={form.metaDescription}
                    onChange={handleChange}
                    multiline
                    rows={1}
                  />
                </Grid>

                {/* Actions */}
                <Grid item xs={12} spacing={3}>
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    gap={2}
                  >
                    <Button
                      variant="outlined"
                      disabled={loading}
                      size="small"
                      onClick={() =>
                        setFormData({
                          title: "",
                          excerpt: "",
                          content: "",
                          imageUrl: "",
                          imagePublicKey: "",
                          metaTitle: "",
                          metaDescription: "",
                        })
                      }
                    >
                      Reset
                    </Button>

                    <Button
                      type="submit"
                      sx={{ mx: 5 }}
                      variant="contained"
                      size="small"
                      disabled={loading}
                      startIcon={
                        loading ? (
                          <CircularProgress size={18} />
                        ) : null
                      }
                    >
                      Publish Blog
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
    </MainLayout>
  );
}

export default AddBlog;