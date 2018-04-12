(function() {
  var server = "http://localhost:6286";
  var url = server + "/Test/File";



  $("#btnUpload").click(function() {
    var formData = new FormData();
    formData.append("file", $("#uploadfile")[0].files[0]);
    formData.append("PageInfo.PageNumber", 10);
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      async: false,
      cache: false,
      contentType: false,
      processData: false,
      success: function(data) {
        console.log("success:", data);
        if (data.Success) {
          $("#uploadimg").attr("src", server + data.ServerMessage);
        }
      },
      error: function(data) {
        console.log("error:", data);
      }
    });

  });

})();