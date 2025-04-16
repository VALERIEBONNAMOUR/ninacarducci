// (function($) {
//   $.fn.mauGallery = function(options) {
//     var options = $.extend($.fn.mauGallery.defaults, options);
//     var tagsCollection = [];
//     return this.each(function() {
//       $.fn.mauGallery.methods.createRowWrapper($(this));
//       if (options.lightBox) {
//         $.fn.mauGallery.methods.createLightBox(
//           $(this),
//           options.lightboxId,
//           options.navigation
//         );
//       }
//       $.fn.mauGallery.listeners(options);

//       $(this)
//         .children(".gallery-item")
//         .each(function(index) {
//           $.fn.mauGallery.methods.responsiveImageItem($(this));
//           $.fn.mauGallery.methods.moveItemInRowWrapper($(this));
//           $.fn.mauGallery.methods.wrapItemInColumn($(this), options.columns);
//           var theTag = $(this).data("gallery-tag");
//           if (
//             options.showTags &&
//             theTag !== undefined &&
//             tagsCollection.indexOf(theTag) === -1
//           ) {
//             tagsCollection.push(theTag);
//           }
//         });

//       if (options.showTags) {
//         $.fn.mauGallery.methods.showItemTags(
//           $(this),
//           options.tagsPosition,
//           tagsCollection
//         );
//       }

//       $(this).fadeIn(500);
//     });
//   };
//   $.fn.mauGallery.defaults = {
//     columns: 3,
//     lightBox: true,
//     lightboxId: null,
//     showTags: true,
//     tagsPosition: "bottom",
//     navigation: true
//   };
//   $.fn.mauGallery.listeners = function(options) {
//     $(".gallery-item").on("click", function() {
//       if (options.lightBox && $(this).prop("tagName") === "IMG") {
//         $.fn.mauGallery.methods.openLightBox($(this), options.lightboxId);
//       } else {
//         return;
//       }
//     });

//     $(".gallery").on("click", ".nav-link", $.fn.mauGallery.methods.filterByTag);
//     $(".gallery").on("click", ".mg-prev", () =>
//       $.fn.mauGallery.methods.prevImage(options.lightboxId)
//     );
//     $(".gallery").on("click", ".mg-next", () =>
//       $.fn.mauGallery.methods.nextImage(options.lightboxId)
//     );
//   };
//   $.fn.mauGallery.methods = {
//     createRowWrapper(element) {
//       if (
//         !element
//           .children()
//           .first()
//           .hasClass("row")
//       ) {
//         element.append('<div class="gallery-items-row row"></div>');
//       }
//     },
//     wrapItemInColumn(element, columns) {
//       if (columns.constructor === Number) {
//         element.wrap(
//           `<div class='item-column mb-4 col-${Math.ceil(12 / columns)}'></div>`
//         );
//       } else if (columns.constructor === Object) {
//         var columnClasses = "";
//         if (columns.xs) {
//           columnClasses += ` col-${Math.ceil(12 / columns.xs)}`;
//         }
//         if (columns.sm) {
//           columnClasses += ` col-sm-${Math.ceil(12 / columns.sm)}`;
//         }
//         if (columns.md) {
//           columnClasses += ` col-md-${Math.ceil(12 / columns.md)}`;
//         }
//         if (columns.lg) {
//           columnClasses += ` col-lg-${Math.ceil(12 / columns.lg)}`;
//         }
//         if (columns.xl) {
//           columnClasses += ` col-xl-${Math.ceil(12 / columns.xl)}`;
//         }
//         element.wrap(`<div class='item-column mb-4${columnClasses}'></div>`);
//       } else {
//         console.error(
//           `Columns should be defined as numbers or objects. ${typeof columns} is not supported.`
//         );
//       }
//     },
//     moveItemInRowWrapper(element) {
//       element.appendTo(".gallery-items-row");
//     },
//     responsiveImageItem(element) {
//       if (element.prop("tagName") === "IMG") {
//         element.addClass("img-fluid");
//       }
//     },
//     openLightBox(element, lightboxId) {
//       $(`#${lightboxId}`)
//         .find(".lightboxImage")
//         .attr("src", element.attr("src"));
//       $(`#${lightboxId}`).modal("toggle");
//     },
//     prevImage() {
//       let activeImage = null;
//       $("img.gallery-item").each(function() {
//         if ($(this).attr("src") === $(".lightboxImage").attr("src")) {
//           activeImage = $(this);
//         }
//       });
//       let activeTag = $(".tags-bar span.active-tag").data("images-toggle");
//       let imagesCollection = [];
//       if (activeTag === "all") {
//         $(".item-column").each(function() {
//           if ($(this).children("img").length) {
//             imagesCollection.push($(this).children("img"));
//           }
//         });
//       } else {
//         $(".item-column").each(function() {
//           if (
//             $(this)
//               .children("img")
//               .data("gallery-tag") === activeTag
//           ) {
//             imagesCollection.push($(this).children("img"));
//           }
//         });
//       }
//       let index = 0,
//         next = null;

//       $(imagesCollection).each(function(i) {
//         if ($(activeImage).attr("src") === $(this).attr("src")) {
//           index = i - 1;
//         }
//       });
//       next =
//         imagesCollection[index] ||
//         imagesCollection[imagesCollection.length - 1];
//       $(".lightboxImage").attr("src", $(next).attr("src"));
//     },
//     nextImage() {
//       let activeImage = null;
//       $("img.gallery-item").each(function() {
//         if ($(this).attr("src") === $(".lightboxImage").attr("src")) {
//           activeImage = $(this);
//         }
//       });
//       let activeTag = $(".tags-bar span.active-tag").data("images-toggle");
//       let imagesCollection = [];
//       if (activeTag === "all") {
//         $(".item-column").each(function() {
//           if ($(this).children("img").length) {
//             imagesCollection.push($(this).children("img"));
//           }
//         });
//       } else {
//         $(".item-column").each(function() {
//           if (
//             $(this)
//               .children("img")
//               .data("gallery-tag") === activeTag
//           ) {
//             imagesCollection.push($(this).children("img"));
//           }
//         });
//       }
//       let index = 0,
//         next = null;

//       $(imagesCollection).each(function(i) {
//         if ($(activeImage).attr("src") === $(this).attr("src")) {
//           index = i + 1;
//         }
//       });
//       next = imagesCollection[index] || imagesCollection[0];
//       $(".lightboxImage").attr("src", $(next).attr("src"));
//     },
//     createLightBox(gallery, lightboxId, navigation) {
//       gallery.append(`<div class="modal fade" id="${
//         lightboxId ? lightboxId : "galleryLightbox"
//       }" tabindex="-1" role="dialog" aria-hidden="true">
//                 <div class="modal-dialog" role="document">
//                     <div class="modal-content">
//                         <div class="modal-body">
//                             ${
//                               navigation
//                                 ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>'
//                                 : '<span style="display:none;" />'
//                             }
//                             <img class="lightboxImage img-fluid" alt="Contenu de l'image affichée dans la modale au clique"/>
//                             ${
//                               navigation
//                                 ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;}">></div>'
//                                 : '<span style="display:none;" />'
//                             }
//                         </div>
//                     </div>
//                 </div>
//             </div>`);
//     },
//     showItemTags(gallery, position, tags) {
//       var tagItems =
//         '<li class="nav-item"><span class="nav-link active active-tag"  data-images-toggle="all">Tous</span></li>';
//       $.each(tags, function(index, value) {
//         tagItems += `<li class="nav-item active">
//                 <span class="nav-link"  data-images-toggle="${value}">${value}</span></li>`;
//       });
//       var tagsRow = `<ul class="my-4 tags-bar nav nav-pills">${tagItems}</ul>`;

//       if (position === "bottom") {
//         gallery.append(tagsRow);
//       } else if (position === "top") {
//         gallery.prepend(tagsRow);
//       } else {
//         console.error(`Unknown tags position: ${position}`);
//       }
//     },
//     filterByTag() {
//       if ($(this).hasClass("active-tag")) {
//         return;
//       }
//       $(".active.active-tag").removeClass("active active-tag");
//       $(this).addClass("active-tag active");

//       var tag = $(this).data("images-toggle");

//       $(".gallery-item").each(function() {
//         $(this)
//           .parents(".item-column")
//           .hide();
//         if (tag === "all") {
//           $(this)
//             .parents(".item-column")
//             .show(300);
//         } else if ($(this).data("gallery-tag") === tag) {
//           $(this)
//             .parents(".item-column")
//             .show(300);
//         }
//       });
//     }
//   };
// })(jQuery);

!function($){$.fn.mauGallery=function(o){var o=$.extend($.fn.mauGallery.defaults,o),n=[];return this.each(function(){$.fn.mauGallery.methods.createRowWrapper($(this)),o.lightBox&&$.fn.mauGallery.methods.createLightBox($(this),o.lightboxId,o.navigation),$.fn.mauGallery.listeners(o),$(this).children(".gallery-item").each(function(e){$.fn.mauGallery.methods.responsiveImageItem($(this)),$.fn.mauGallery.methods.moveItemInRowWrapper($(this)),$.fn.mauGallery.methods.wrapItemInColumn($(this),o.columns);var e=$(this).data("gallery-tag");o.showTags&&void 0!==e&&-1===n.indexOf(e)&&n.push(e)}),o.showTags&&$.fn.mauGallery.methods.showItemTags($(this),o.tagsPosition,n),$(this).fadeIn(500)})},$.fn.mauGallery.defaults={columns:3,lightBox:!0,lightboxId:null,showTags:!0,tagsPosition:"bottom",navigation:!0},$.fn.mauGallery.listeners=function(o){$(".gallery-item").on("click",function(){o.lightBox&&"IMG"===$(this).prop("tagName")?$.fn.mauGallery.methods.openLightBox($(this),o.lightboxId):void 0}),$(".gallery").on("click",".nav-link",$.fn.mauGallery.methods.filterByTag),$(".gallery").on("click",".mg-prev",()=>$.fn.mauGallery.methods.prevImage(o.lightboxId)),$(".gallery").on("click",".mg-next",()=>$.fn.mauGallery.methods.nextImage(o.lightboxId))},$.fn.mauGallery.methods={createRowWrapper(e){e.children().first().hasClass("row")||e.append('<div class="gallery-items-row row"></div>')},wrapItemInColumn(e,o){if(o.constructor===Number)e.wrap(`<div class='item-column mb-4 col-${Math.ceil(12/o)}'></div>`);else if(o.constructor===Object){var n="";o.xs&&(n+=` col-${Math.ceil(12/o.xs)}`),o.sm&&(n+=` col-sm-${Math.ceil(12/o.sm)}`),o.md&&(n+=` col-md-${Math.ceil(12/o.md)}`),o.lg&&(n+=` col-lg-${Math.ceil(12/o.lg)}`),o.xl&&(n+=` col-xl-${Math.ceil(12/o.xl)}`),e.wrap(`<div class='item-column mb-4${n}'></div>`)}else console.error(`Columns should be defined as numbers or objects. ${typeof o} is not supported.`)},moveItemInRowWrapper(e){e.appendTo(".gallery-items-row")},responsiveImageItem(e){"IMG"===e.prop("tagName")&&e.addClass("img-fluid")},openLightBox(e,o){$(`#${o}`).find(".lightboxImage").attr("src",e.attr("src")),$(`#${o}`).modal("toggle")},prevImage(){let o=null;$("img.gallery-item").each(function(){$(this).attr("src")===$(".lightboxImage").attr("src")&&(o=$(this))});let n=$(".tags-bar span.active-tag").data("images-toggle"),t=[];"all"===n?$(".item-column").each(function(){$(this).children("img").length&&t.push($(this).children("img"))}):$(".item-column").each(function(){$(this).children("img").data("gallery-tag")===n&&t.push($(this).children("img"))});let i=0,c=null;$(t).each(function(n){$(o).attr("src")===$(this).attr("src")&&(i=n-1)}),c=t[i]||t[t.length-1],$(".lightboxImage").attr("src",$(c).attr("src"))},nextImage(){let o=null;$("img.gallery-item").each(function(){$(this).attr("src")===$(".lightboxImage").attr("src")&&(o=$(this))});let n=$(".tags-bar span.active-tag").data("images-toggle"),t=[];"all"===n?$(".item-column").each(function(){$(this).children("img").length&&t.push($(this).children("img"))}):$(".item-column").each(function(){$(this).children("img").data("gallery-tag")===n&&t.push($(this).children("img"))});let i=0,c=null;$(t).each(function(n){$(o).attr("src")===$(this).attr("src")&&(i=n+1)}),c=t[i]||t[0],$(".lightboxImage").attr("src",$(c).attr("src"))},createLightBox(o,n,t){o.append(`<div class="modal fade" id="${n?n:"galleryLightbox"}" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-body">${t?'<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>':'<span style="display:none;" />'}<img class="lightboxImage img-fluid" alt="Contenu de l'image affichée dans la modale au clique"/>${t?'<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;}">></div>':'<span style="display:none;" />'}</div></div></div></div>`)},showItemTags(o,n,t){var i='<li class="nav-item"><span class="nav-link active active-tag"  data-images-toggle="all">Tous</span></li>';$.each(t,function(o,n){i+=`<li class="nav-item active"><span class="nav-link"  data-images-toggle="${n}">${n}</span></li>`});var c=`<ul class="my-4 tags-bar nav nav-pills">${i}</ul>`;"bottom"===n?o.append(c):"top"===n?o.prepend(c):console.error(`Unknown tags position: ${n}`)},filterByTag(){if($(this).hasClass("active-tag"))return;$(".active.active-tag").removeClass("active active-tag"),$(this).addClass("active-tag active");var o=$(this).data("images-toggle");$(".gallery-item").each(function(){$(this).parents(".item-column").hide(),"all"===o?$(this).parents(".item-column").show(300):$(this).data("gallery-tag")===o&&$(this).parents(".item-column").show(300)})}}}(jQuery);

