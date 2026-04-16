import { describe, it, expect } from 'vitest';
import { createWebSocketHook } from '../../src/prototype-chain/websocket.js';

describe('createWebSocketHook', () => {
  it('should replace WebSocket.prototype.send when installed', () => {
    const originalSend = WebSocket.prototype.send;
    const hook = createWebSocketHook(() => {});
    hook.install();

    expect(WebSocket.prototype.send).not.toBe(originalSend);

    hook.uninstall();
  });

  it('should restore original send on uninstall', () => {
    const originalSend = WebSocket.prototype.send;
    const hook = createWebSocketHook(() => {});
    hook.install();
    hook.uninstall();

    expect(WebSocket.prototype.send).toBe(originalSend);
  });
});
