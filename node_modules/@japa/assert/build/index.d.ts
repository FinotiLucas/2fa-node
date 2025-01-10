import type { PluginFn } from '@japa/runner/types';
import { Assert } from './src/assert.js';
import type { PluginConfig } from './src/types.js';
declare module '@japa/runner/core' {
    interface TestContext {
        assert: Assert;
    }
}
/**
 * Plugin for "@japa/runner"
 */
export declare function assert(_options?: PluginConfig): PluginFn;
export { Assert };
