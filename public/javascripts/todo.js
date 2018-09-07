$(document).ready(function(){
    //handle add button click
    $("#add").click(function(){
        var item = $('.add-items input').val();
        $.ajax({
            url:'/todo/add',
            method:'post',
            data:{item:item},
            dataType:'text',
            success:function(){
                $(".container").append('<div class="list-item">' +
                '<p>' + item +'</p>' +
                '<input type="checkbox" title="done">' +
                '<span class="checkmark"></span>' +
                '</div> ');
            }
        });

    });
    //handle checkbox checked  
    $(".container").on("change" , ".list-item input" , function(){    
        var parent = $(this).parent();   
        $.ajax({            
            url:'/todo/delete',
            method:'post',
            data:{item:$.trim(parent.first().text())},
            dataType:'text',
            success:function(){
                parent.fadeOut();
            }
        });   
    });
});