<template>
    <div 
        class="d-flex flex-column align-center justify-center"
    >
        {{ phoneNumber }}
        <div class="mb-3 mt-10">Phone Number</div>
        <div
            ref="phoneNumberInput"
            class="phone-number-input"
            dir="auto"
            contenteditable="true"
            data-no-linebreaks="true"
            inputmode="decimal"
            @input="handleChangeInput"
            :data-left-pattern="leftPattern"
        >
            +1
        </div>

    </div>
</template>
<script>
import { defineComponent, ref, computed } from 'vue';
import { formatPhoneNumber, getLeftPattern } from '@/helpers/phone-number';
import { placeCaretAtEnd } from '@/helpers/utils';

export default defineComponent({
  name: 'PhoneNumberInput',
  setup() {
    const phoneNumberInput = ref(null)
    const phoneNumber = ref('')
    const countryCode = 1 // default USA
    const pattern = '### ### ####'// default Pattern USA
    
    const leftPattern = computed(() => {
        return getLeftPattern(pattern, phoneNumber.value)
    })
    
    const handleChangeInput = (e) => {
        phoneNumber.value = formatPhoneNumber(
            e.target.innerText,
            {
                countryCode,
                pattern
            }
        )
        phoneNumberInput.value.textContent = 
            `+${countryCode} ${phoneNumber.value}`
        placeCaretAtEnd(phoneNumberInput.value, true)
    } 
    return {
        phoneNumber,
        leftPattern,
        handleChangeInput,
        phoneNumberInput
    };
  },
});
</script>
<style lang="scss" scoped>
[contentediable=true] {
    user-select: text;
    outline: none;
    cursor: text;
    white-space: pre-wrap;
}
.phone-number-input {
    width: 50%;
    padding: 10px;
    border: 1px solid #9e9e9e;
    border-radius: 8px;
    &::after {
        content: attr(data-left-pattern);
        color: #9e9e9e;
        letter-spacing: -0.32px;
    }
}
</style>