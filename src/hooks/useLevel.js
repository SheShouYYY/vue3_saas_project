export default (val) => {
    let level = ref('')
    switch (val) {
        case 1:
            level.value = '初级'
            break;
        case 2:
            level.value = '中级'
            break;
        case 3:
            level.value = '高级'
            break;
    }
    return level
}