<template>
  <input type="file" name="file" @change = "fileInput($event)"/>
</template>

<script>
import axios from 'axios';
export default {
  name: "Upload",
  data: () => {
    
  },
  methods: {
    fileInput(ev) {
      // const handleIpt = document.querySelector('#handleIpt') ;
      let file = ev.target.files[0];
      let formdata = new FormData();
      formdata.append('upfile',file,file.name);
      axios.post('http://localhost:5000/upload',formdata).then(res=>{
        console.log(res);
        // if (res.status === 200) {
        //     console.log("上传成功");
        //   }
      })

    },
  },
};
</script>

<style></style>
