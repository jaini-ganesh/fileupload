import React from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

const Uploader = () => {
  const axios = require("axios").default;

  const API_ENDPOINT = "https://ia79wsi954.execute-api.us-east-2.amazonaws.com/fileuploadsdk"
  const handleChangeStatus = ({ meta, remove }, status) => {
    console.log(status, meta);
  };

  const handleSubmit = async (files) => {
    const f = files[0];
    const response = await axios({
      method: "GET",
      url: API_ENDPOINT,
    });
    const result = await fetch(response.data.uploadURL, {
      method: "PUT",
      body: f["file"],
    });
  };

  return (
    <Dropzone
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      maxFiles={1}
      multiple={false}
      canCancel={false}
      inputContent="Drop A File"
      styles={{
        dropzone: { width: 400, height: 200 },
        dropzoneActive: { borderColor: "green" },
      }}
    />
  );
};
<Uploader />;

export default Uploader;

jaini.ganesh@gmail.com