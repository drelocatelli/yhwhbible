<script>
    
    let request = new Request('https://raw.githubusercontent.com/drelocatelli/yhwhsalmos/master/bible.php', {
        method: 'GET',
    });

    fetch(request).then(function(response) { return response.text() }).then(function(response){

        document.body.innerHTML = response;
        
    })
</script>

