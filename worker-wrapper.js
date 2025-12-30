// Polyfill for process.report.getReport before importing the worker
// This is needed because Cloudflare Workers doesn't implement this Node.js API
if (typeof process !== 'undefined' && process.report) {
  if (!process.report.getReport) {
    process.report.getReport = function () {
      // Return a minimal report structure to prevent errors
      return {
        header: {
          event: 'error',
          trigger: 'Worker',
          filename: 'worker.js',
          dumpEventTime: new Date().toISOString(),
          dumpEventTimeStamp: Date.now().toString(),
        },
        javascriptStack: '',
        nativeStack: '',
        javascriptHeap: {
          usedJSHeapSize: 0,
          totalJSHeapSize: 0,
          jsHeapSizeLimit: 0,
        },
        resourceUsage: {
          userCpuSeconds: 0,
          kernelCpuSeconds: 0,
          maxRSS: 0,
          pageFaults: {
            IORequired: 0,
            IONotRequired: 0,
          },
          fsActivity: {
            reads: 0,
            writes: 0,
          },
        },
        uvthreadpoolResourceUsage: {
          userCpuSeconds: 0,
          kernelCpuSeconds: 0,
        },
        libuv: [],
        workers: [],
        environmentVariables: {},
        userLimits: {},
        sharedObjects: [],
      }
    }
  }
}

// Import and export the original worker
// This will be dynamically resolved to .open-next/worker.js after build
// Re-export all named exports
export * from './.open-next/worker.js'

// Re-export default export if it exists
import workerDefault from './.open-next/worker.js'
export default workerDefault
