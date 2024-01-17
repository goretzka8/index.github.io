
$.ajax({
  type: "GET",
  url: "http://115.29.205.84:8888/api/uploaded/IMG_9211 .mp4",
  success: function (data) {
    const imageUrl = 'http://115.29.205.84:8888/api/uploaded/IMG_9211 .mp4';
    const imageTitle = '1'; 

   const videoElement = $('<video>').attr('src', imageUrl).attr('controls', 'controls');

    $('#imageContainer1').html(videoElement);

    // 初始化 Fancybox
    $('[data-fancybox="gallery"]').fancybox();
  },
  error: function () {
    console.error('获取图像数据失败。');
  }
});
$.ajax({
        type: "GET",
        url: "http://115.29.205.84:8888/api/images/23", // 替换为你的后端接口地址
        success: function (data) {
            // 处理返回的图片数据
            const imageData = data.imageData;
             const imageUrl = 'http://115.29.205.84:8888/api/images/23' + imageData;
         const imageTitle = '2'; 
            // 在网页中创建<img>元素并展示图
        // 在图像周围创建一个链接并添加 Fancybox 属性
          const imgLink = $('<a>').attr('href', imageUrl).attr('data-fancybox', 'gallery').attr('data-caption', imageTitle);
        const imgElement = $('<img>').attr('src', imageUrl);
        
        // 将图像附加到链接，然后附加到容器中
        imgLink.append(imgElement);
        $('#imageContainer2').html(imgLink);

        // 初始化 Fancybox
        $('[data-fancybox="gallery"]').fancybox();
    },
    error: function () {
        console.error('获取图像数据失败。');
    }
});
        $.ajax({
        type: "GET",
        url: "http://115.29.205.84:8888/api/images/24", // 替换为你的后端接口地址
        success: function (data) {
            // 处理返回的图片数据
            const imageData = data.imageData;
             const imageUrl = 'http://115.29.205.84:8888/api/images/24' + imageData;
             const imageTitle = '3'; 
            // 在网页中创建<img>元素并展示图
        // 在图像周围创建一个链接并添加 Fancybox 属性
          const imgLink = $('<a>').attr('href', imageUrl).attr('data-fancybox', 'gallery').attr('data-caption', imageTitle);
        const imgElement = $('<img>').attr('src', imageUrl);
        
        // 将图像附加到链接，然后附加到容器中
        imgLink.append(imgElement);
        $('#imageContainer3').html(imgLink);

        // 初始化 Fancybox
        $('[data-fancybox="gallery"]').fancybox();
    },
    error: function () {
        console.error('获取图像数据失败。');
    }
});
        $.ajax({
        type: "GET",
        url: "http://115.29.205.84:8888/api/images/25", // 替换为你的后端接口地址
        success: function (data) {
            // 处理返回的图片数据
            const imageData = data.imageData;
             const imageUrl = 'http://115.29.205.84:8888/api/images/25' + imageData;
            const imageTitle = '4'; 
            // 在网页中创建<img>元素并展示图
        // 在图像周围创建一个链接并添加 Fancybox 属性
          const imgLink = $('<a>').attr('href', imageUrl).attr('data-fancybox', 'gallery').attr('data-caption', imageTitle);
        const imgElement = $('<img>').attr('src', imageUrl);
        
        // 将图像附加到链接，然后附加到容器中
        imgLink.append(imgElement);
        $('#imageContainer4').html(imgLink);

        // 初始化 Fancybox
        $('[data-fancybox="gallery"]').fancybox();
    },
    error: function () {
        console.error('获取图像数据失败。');
    }
});
       $.ajax({
        type: "GET",
        url: "http://115.29.205.84:8888/api/images/26", // 替换为你的后端接口地址
        success: function (data) {
            // 处理返回的图片数据
            const imageData = data.imageData;
             const imageUrl = 'http://115.29.205.84:8888/api/images/26' + imageData;
             const imageTitle = '5'; 
            // 在网页中创建<img>元素并展示图
        // 在图像周围创建一个链接并添加 Fancybox 属性
          const imgLink = $('<a>').attr('href', imageUrl).attr('data-fancybox', 'gallery').attr('data-caption', imageTitle);
        const imgElement = $('<img>').attr('src', imageUrl);
        
        // 将图像附加到链接，然后附加到容器中
        imgLink.append(imgElement);
        $('#imageContainer5').html(imgLink);

        // 初始化 Fancybox
        $('[data-fancybox="gallery"]').fancybox();
    },
    error: function () {
        console.error('获取图像数据失败。');
    }
});
        $.ajax({
        type: "GET",
        url: "http://115.29.205.84:8888/api/images/27", // 替换为你的后端接口地址
        success: function (data) {
            // 处理返回的图片数据
            const imageData = data.imageData;
             const imageUrl = 'http://115.29.205.84:8888/api/images/27' + imageData;
               const imageTitle = '6'; 
            // 在网页中创建<img>元素并展示图
        // 在图像周围创建一个链接并添加 Fancybox 属性
          const imgLink = $('<a>').attr('href', imageUrl).attr('data-fancybox', 'gallery').attr('data-caption', imageTitle);
        const imgElement = $('<img>').attr('src', imageUrl);
        
        // 将图像附加到链接，然后附加到容器中
        imgLink.append(imgElement);
        $('#imageContainer6').html(imgLink);

        // 初始化 Fancybox
        $('[data-fancybox="gallery"]').fancybox();
    },
    error: function () {
        console.error('获取图像数据失败。');
    }
});

        $.ajax({
        type: "GET",
        url: "http://115.29.205.84:8888/api/images/28", // 替换为你的后端接口地址
        success: function (data) {
            // 处理返回的图片数据
            const imageData = data.imageData;
             const imageUrl = 'http://115.29.205.84:8888/api/images/28' + imageData;
         const imageTitle = '7'; 
            // 在网页中创建<img>元素并展示图
        // 在图像周围创建一个链接并添加 Fancybox 属性
          const imgLink = $('<a>').attr('href', imageUrl).attr('data-fancybox', 'gallery').attr('data-caption', imageTitle);
        const imgElement = $('<img>').attr('src', imageUrl);
        
        // 将图像附加到链接，然后附加到容器中
        imgLink.append(imgElement);
        $('#imageContainer7').html(imgLink);

        // 初始化 Fancybox
        $('[data-fancybox="gallery"]').fancybox();
    },
    error: function () {
        console.error('获取图像数据失败。');
    }
});
        $.ajax({
        type: "GET",
        url: "http://115.29.205.84:8888/api/images/29", // 替换为你的后端接口地址
        success: function (data) {
            // 处理返回的图片数据
            const imageData = data.imageData;
             const imageUrl = 'http://115.29.205.84:8888/api/images/29' + imageData;
              const imageTitle = '8'; 
            // 在网页中创建<img>元素并展示图
        // 在图像周围创建一个链接并添加 Fancybox 属性
          const imgLink = $('<a>').attr('href', imageUrl).attr('data-fancybox', 'gallery').attr('data-caption', imageTitle);
        const imgElement = $('<img>').attr('src', imageUrl);
        
        // 将图像附加到链接，然后附加到容器中
        imgLink.append(imgElement);
        $('#imageContainer8').html(imgLink);

        // 初始化 Fancybox
        $('[data-fancybox="gallery"]').fancybox();
    },
    error: function () {
        console.error('获取图像数据失败。');
    }
});
        $.ajax({
        type: "GET",
        url: "http://115.29.205.84:8888/api/images/30", // 替换为你的后端接口地址
        success: function (data) {
            // 处理返回的图片数据
            const imageData = data.imageData;
             const imageUrl = 'http://115.29.205.84:8888/api/images/30' + imageData;
               const imageTitle = '9'; 
            // 在网页中创建<img>元素并展示图
        // 在图像周围创建一个链接并添加 Fancybox 属性
          const imgLink = $('<a>').attr('href', imageUrl).attr('data-fancybox', 'gallery').attr('data-caption', imageTitle);
        const imgElement = $('<img>').attr('src', imageUrl);
        
        // 将图像附加到链接，然后附加到容器中
        imgLink.append(imgElement);
        $('#imageContainer9').html(imgLink);

        // 初始化 Fancybox
        $('[data-fancybox="gallery"]').fancybox();
    },
    error: function () {
        console.error('获取图像数据失败。');
    }
});
