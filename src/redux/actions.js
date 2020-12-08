import {TABLE_RESIZE} from '@/redux/types';

// Action creators
export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    }
}
