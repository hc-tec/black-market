<template>
  <div 
	class="form-input"
	:class="[isFocus ? 'input-focus' : '',
			 value ? 'input-valid' : '']">
    <i 
		class="icon" 
		:class="icon"
		@click="$emit('icon-click')">
	</i>
	
    <textarea
      required
      v-if="type === 'textarea'"
      :value="value"
	  :adjust-position="false"
	  @focus="isFocus=true"
	  @blur="isFocus=false"
      @input="$emit('input', $event.target.value)">
    </textarea>
    <input 
      v-else required 
	  :class="type === 'password' ? 'input-password' : ''"
      :type="type" 
      :value="value"
	  :cursor="0"
	  :selection-start="0"
	  :selection-end="0"
	  :adjust-position="false"
	  @focus="isFocus=true"
	  @blur="isFocus=false"
      @input="$emit('input', $event.target.value)"/>
    <span class="label">{{ label }}</span>
    <span class="underline"></span>
  </div>
</template> 
<script>
	/**
	 * input 输入框
	 * @description Input 仿 flutter 输入框
	 * @property {String} icon 输入框左边的图标
	 * @property {String} type 输入框类型，text | password | textarea ...
	 * @property {String} label (伪) placeholder
	 * @property {String} value 双向绑定的值
	 * @example <ncu-input
					label="学号"
					icon="people"
					type="text"
					v-model="value">
				</ncu-input>
	 */
	export default {
		name: 'ncu-input',
		props: {
			icon: {
				type: String,
				default: () => ''
			},
			type: {
				type: String,
				default: () => 'text'
			},
			label: {
				type: String,
				default: () => ''
			},
			value: {
				type: String || Number,
				default: () => ''
			},
		},
		model: {
			prop: 'value',
			event: 'input'
		},
	    data() {
	        return {
				isFocus: false
	        }
	    }
	}
</script>
<style lang="scss" scoped>
.form-input {
  --width: 80%;
  display: flex;
  position: relative;
  margin-bottom: 1rem;
}
.form-input .icon {
  position: absolute;
  font-size: 1.7em;
  top: 50%;
  right: 31px;
  transform: translateY(-50%);
  z-index: 10;
}
.form-input > textarea {
  resize: vertical;
  min-height: 125px;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(144, 147, 153, 0.3);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track-piece {
    background-color: transparent;
  }
}
.form-input > input,
.form-input > textarea,
.form-input > .label, 
.form-input > .underline {
  margin-left: 2.25rem !important;
  width: calc(100% - 2.25rem);
}
.form-input input,
.form-input textarea {
  border: none;
  box-shadow: none;
  margin-top: 1.2rem;
  padding-right: 27px;
  padding-bottom: 0.8rem;
  padding-left: 0;
  outline-style: none;
  width: var(--width);
  min-height: 30px;
  opacity: .7;
}
.form-input .input-password {
	font-size: .6rem;
}
.form-input input ~ .label,
.form-input textarea ~ .label {
  text-align: left;
  color: #868e96;
  font-size: 1rem;
  margin: 0;
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  transition: top .2s;
}
.form-input input ~ .underline,
.form-input textarea ~ .underline {
  background-color: #bdc1c5;
  height: 1px;
  width: var(--width);
  position: absolute;
  bottom: 0;
  left: 0;
  transition: height .2s;
}
.input-focus {
	
	& input,
	& textarea {
		opacity: 1 !important;
	}
	
	& .icon {
		color: rgb(86, 186, 237) !important;
	}
	
	& .underline {
		background-color: rgb(86, 186, 237) !important;
		height: 2px !important;
	}
	
	& .label {
		color: rgb(86, 186, 237) !important;
		top: 0 !important;
		font-size: 0.85rem !important;
	}
	
}
.input-valid {
	& .label {
		top: 0 !important;
		font-size: 0.85rem !important;
	}
}
</style>