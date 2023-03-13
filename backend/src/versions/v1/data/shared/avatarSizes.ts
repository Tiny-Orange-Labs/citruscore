type AvatarSizes = {
    resolution: {
        large: number;
        medium: number;
        small: number;
    };
    file: {
        maxSize: number;
    };
};

const avatarSizes: AvatarSizes = Object.freeze({
    resolution: {
        large: 224,
        medium: 128,
        small: 44,
    },
    file: {
        maxSize: 1024 * 1024 * 4, // 4MBs
    },
});

export default avatarSizes;
