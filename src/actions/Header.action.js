export const SELECTKEYS_TO_HEADER = 'SELECTKEYS_TO_HEADER'

export function selectkeysToHeader(selectedKeys){
    return {
        type:SELECTKEYS_TO_HEADER,
        selectedKeys:selectedKeys
    }
}