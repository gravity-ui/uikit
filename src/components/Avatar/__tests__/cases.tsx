import type {Cases} from '../../../stories/tests-factory/models';
import type {AvatarProps} from '../types/main';

export const sizeCases: Cases<AvatarProps['size']> = ['xs', 's', 'm', 'l', 'xl'];
export const themeCases: Cases<AvatarProps['theme']> = ['normal', 'brand'];
export const viewCases: Cases<AvatarProps['view']> = ['filled', 'outlined'];
export const backgroundColorCases: Cases<AvatarProps['backgroundColor']> = ['darkblue'];
export const borderColorCases: Cases<AvatarProps['borderColor']> = ['tomato'];
export const titleCases: Cases<AvatarProps['title']> = ['Title'];
