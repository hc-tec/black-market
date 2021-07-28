<template>
	<div class="ncu-loading-bounce-ball">
	</div>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
	$color1: #2F1E38;
	$color2: #FFCD57;
	.ncu-loading-bounce-ball {
	    position: relative;
	    width: 180px;
	    height: 90px;
	    margin: auto;
		
	    &:after, &:before {
	        position: absolute;
	        content: "";
	        height: 60px;
	        width: 60px;
	        top: 10px;
	        background-color: $color2;
	        border-radius: 50%;
	    }
	    
	    &:after {
	        left:120px;
	        animation: loader-move2 0.5s ease-in-out infinite;
	        animation-direction: alternate;
	    }
	    
	    &:before {
	        animation: loader-move1 0.5s ease-in-out infinite;
	        animation-direction: alternate;
	    }
	}
	
	@keyframes loader-move1 {
	    0% {
	        transform: translatex(0px);
	    } 
	    65% {
	        height: 60px;
	        width: 60px;
	    }
	    100% {
	        height: 75px;
	        width: 40px;
	        transform: translatex(45px);
	    }
	}
	@keyframes loader-move2 {
	    0% {
	        transform: translatex(0px);
	    } 
	    65% {
	        height: 60px;
	        width: 60px;
	    }
	    100% {
	        height: 75px;
	        width: 40px;
	        transform: translatex(-45px);
	    }
	}
</style>


