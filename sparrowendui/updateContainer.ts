import {
    ConcurrentMode,
    HostRoot,
    NoFlags,
    createFiber
} from "./element";
import {
    createCursor,
    pop,
    push
} from './filberStack'
const NoLane = /*                          */ 0b0000000000000000000000000000000;
const SyncLane = /*                        */ 0b0000000000000000000000000000001;
const NoMode = /*                         */ 0b000000;
 const LegacyRoot = 0;
const UpdateState = 0;
const enableCache = true;
const enableSchedulingProfiler = false;
const NonIdleLanes = /*                                 */ 0b0001111111111111111111111111111;
let getCurrentTime;
const NoLanes = /*                        */ 0b0000000000000000000000000000000;
const NoTimestamp = -1;
const NoContext = /*             */ 0b000;
const BatchedContext = /*               */ 0b001;
let workInProgressRootRenderPhaseUpdatedLanes = NoLanes;
const RenderContext = /*                */ 0b010;
export const disableLegacyContext = false;
const forkStack = [];
let pendingPassiveEffectsLanes = NoLanes;
let pendingPassiveEffectsRemainingLanes = NoLanes;
let forkStackIndex = 0;
let treeForkProvider = null;
let treeForkCount = 0;
let rootWithPendingPassiveEffects = null;
const idStack = [];
let idStackIndex = 0;
let treeContextProvider = null;
let treeContextId = 1;
let treeContextOverflow = '';
let nestedUpdateCount = 0;
let workInProgress = null;
let rootWithNestedUpdates = null;
let noTimeout = -1;
let workInProgressRootIncludedLanes = NoLanes;
const RootInProgress = 0;
let workInProgressRootInterleavedUpdatedLanes = NoLanes;
let workInProgressRootExitStatus = RootInProgress;
const RootSuspendedWithDelay = 4;
let workInProgressRootPingedLanes = NoLanes;
const NoPriority = 0;
const ImmediatePriority = 1;
const UserBlockingPriority = 2;
const NormalPriority = 3;
const LowPriority = 4;
const IdlePriority = 5;
export const FunctionComponent = 0;
export const ClassComponent = 1;
export const IndeterminateComponent = 2; // Before we know whether it is function or class
export const HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
export const HostComponent = 5;
export const HostText = 6;
export const Fragment = 7;
export const Mode = 8;
export const ContextConsumer = 9;
export const ContextProvider = 10;
export const ForwardRef = 11;
export const Profiler = 12;
export const SuspenseComponent = 13;
export const MemoComponent = 14;
export const SimpleMemoComponent = 15;
export const LazyComponent = 16;
export const IncompleteClassComponent = 17;
export const DehydratedFragment = 18;
export const SuspenseListComponent = 19;
export const ScopeComponent = 21;
export const OffscreenComponent = 22;
export const LegacyHiddenComponent = 23;
export const CacheComponent = 24;
export const TracingMarkerComponent = 25;
export const IdleLane = /*                       */ 0b0100000000000000000000000000000;
export const RefStatic = /*                    */ 0b00001000000000000000000000;
export const LayoutStatic = /*                 */ 0b00010000000000000000000000;
export const PassiveStatic = /*                */ 0b00100000000000000000000000;
export const StaticMask = LayoutStatic | PassiveStatic | RefStatic;

const NESTED_UPDATE_LIMIT = 50;
export const DefaultLane = /*                    */ 0b0000000000000000000000000010000;
const CommitContext = /*                */ 0b100;
let workInProgressRootRenderLanes = NoLanes;
let currentEventTransitionLane = NoLanes;

export const deferRenderPhaseUpdateToNextBatch = false;
const enableUpdaterTracking = false
let executionContext = NoContext;

const hasPerformanceNow =
    typeof performance === 'object' && typeof performance.now === 'function';
if (hasPerformanceNow) {
    const localPerformance = performance;
    getCurrentTime = () => localPerformance.now();
} else {
    const localDate = Date;
    const initialTime = localDate.now();
    getCurrentTime = () => localDate.now() - initialTime;
}
let currentEventTime = NoTimestamp;
const TransitionLane1 = /*                        */ 0b0000000000000000000000001000000;
const RetryLane1 = /*                             */ 0b0000000010000000000000000000000;
let nextTransitionLane = TransitionLane1;
let nextRetryLane = RetryLane1;
let workInProgressRoot = null; // ？？？？
let interleavedQueues = null;
const emptyContextObject = {};
const didPerformWorkStackCursor = createCursor(false);
const NO_CONTEXT = {};
const workInProgressSources = []
const isPrimaryRenderer = false;
const DefaultSuspenseContext = 0b00;

const contextStackCursor = createCursor(
    emptyContextObject,
);
const contextFiberStackCursor = createCursor(
    NO_CONTEXT,
);
const rootInstanceStackCursor = createCursor(NO_CONTEXT);
const suspenseStackCursor = createCursor(DefaultSuspenseContext)
const valueCursor = createCursor(null);
let subtreeRenderLanes = NoLanes;
const resumedCache = createCursor(null);
export let REACT_CONTEXT_TYPE = 0xeace;

const subtreeRenderLanesCursor = createCursor(NoLanes);
export const CacheContext = enableCache ? {
        $$typeof: REACT_CONTEXT_TYPE,
        // We don't use Consumer/Provider for Cache components. So we'll cheat.
        Consumer: null,
        Provider: null,
        // We'll initialize these at the root.
        _currentValue: null,
        _currentValue2: null,
        _threadCount: 0,
    } :
    null;

export function pushInterleavedQueue(
    queue,
) {
    if (interleavedQueues === null) {
        interleavedQueues = [queue];
    } else {
        interleavedQueues.push(queue);
    }
}

export function isInterleavedUpdate(fiber, lane) {
    return (
        // TODO: Optimize slightly by comparing to root that fiber belongs to.
        // Requires some refactoring. Not a big deal though since it's rare for
        // concurrent apps to have more than a single root.
        workInProgressRoot !== null &&
        (fiber.mode & ConcurrentMode) !== NoMode &&
        // If this is a render phase update (i.e. UNSAFE_componentWillReceiveProps),
        // then don't treat this as an interleaved update. This pattern is
        // accompanied by a warning but we haven't fully deprecated it yet. We can
        // remove once the deferRenderPhaseUpdateToNextBatch flag is enabled.
        (deferRenderPhaseUpdateToNextBatch ||
            (executionContext & RenderContext) === NoContext)
    );
}

function requestEventTime() {
    // if ((executionContext & (RenderContext | CommitContext)) !== NoContext) {
    //   // We're inside React, so it's fine to read the actual time.
    //   return getCurrentTime();
    // }
    // We're not inside React, so we may be in the middle of a browser event.
    if (currentEventTime !== NoTimestamp) {
        // Use the same start time for all updates until we enter React again.
        return currentEventTime;
    }
    // This is the first update since React yielded. Compute a new start time.
    currentEventTime = getCurrentTime();
    return currentEventTime;
}

export function claimNextTransitionLane() {
    // Cycle through the lanes, assigning each new transition to the next lane.
    // In most cases, this means every transition gets its own lane, until we
    // run out of lanes and cycle back to the beginning.
    const lane = nextTransitionLane;
    nextTransitionLane <<= 1;
    if ((nextTransitionLane & TransitionLanes) === 0) {
        nextTransitionLane = TransitionLane1;
    }
    return lane;
}
export function getHighestPriorityLane(lanes) {
    return lanes & -lanes;
}

export function pickArbitraryLane(lanes) {
    // This wrapper function gets inlined. Only exists so to communicate that it
    // doesn't matter which bit is selected; you can pick any bit without
    // affecting the algorithms where its used. Here I'm using
    // getHighestPriorityLane because it requires the fewest operations.
    return getHighestPriorityLane(lanes);
}

const ReactCurrentBatchConfig = {
    transition: null,
};

export const NoTransition = null;

export function requestCurrentTransition() {
    return ReactCurrentBatchConfig.transition;
}


let currentUpdatePriority = NoLane;

export function getCurrentUpdatePriority() {
    return currentUpdatePriority;
}

export function setCurrentUpdatePriority(newPriority) {
    currentUpdatePriority = newPriority;
}

export function runWithPriority(priority, fn) {
    const previousPriority = currentUpdatePriority;
    try {
        currentUpdatePriority = priority;
        return fn();
    } finally {
        currentUpdatePriority = previousPriority;
    }
}

function requestUpdateLane(fiber) {
    // Special cases
    const mode = fiber.mode;
    if ((mode & ConcurrentMode) === NoMode) {
        return (SyncLane);
    } else if (
        !deferRenderPhaseUpdateToNextBatch &&
        (executionContext & RenderContext) !== NoContext &&
        workInProgressRootRenderLanes !== NoLanes
    ) {
        // This is a render phase update. These are not officially supported. The
        // old behavior is to give this the same "thread" (lanes) as
        // whatever is currently rendering. So if you call `setState` on a component
        // that happens later in the same render, it will flush. Ideally, we want to
        // remove the special case and treat them as if they came from an
        // interleaved event. Regardless, this pattern is not officially supported.
        // This behavior is only a fallback. The flag only exists until we can roll
        // out the setState warning, since existing code might accidentally rely on
        // the current behavior.
        return pickArbitraryLane(workInProgressRootRenderLanes);
    }

    const isTransition = requestCurrentTransition() !== NoTransition;
    if (isTransition) {

        // The algorithm for assigning an update to a lane should be stable for all
        // updates at the same priority within the same event. To do this, the
        // inputs to the algorithm must be the same.
        //
        // The trick we use is to cache the first of each of these inputs within an
        // event. Then reset the cached values once we can be sure the event is
        // over. Our heuristic for that is whenever we enter a concurrent work loop.
        if (currentEventTransitionLane === NoLane) {
            // All transitions within the same event are assigned the same lane.
            currentEventTransitionLane = claimNextTransitionLane();
        }
        return currentEventTransitionLane;
    }

    // Updates originating inside certain React methods, like flushSync, have
    // their priority set by tracking it with a context variable.
    //
    // The opaque type returned by the host config is internally a lane, so we can
    // use that directly.
    // TODO: Move this type conversion to the event priority module.
    const updateLane = (getCurrentUpdatePriority());
    if (updateLane !== NoLane) {
        return updateLane;
    }

    // This update originated outside React. Ask the host environment for an
    // appropriate priority, based on the type of event.
    //
    // The opaque type returned by the host config is internally a lane, so we can
    // use that directly.
    // TODO: Move this type conversion to the event priority module.
    const eventLane = DefaultLane
    return eventLane;
}


// 0000000000000000990909090909090909090
function createUpdate(eventTime, lane) {
    const update = {
        eventTime,
        lane,
        tag: UpdateState,
        payload: null,
        callback: null,

        next: null,
    };
    return update;
}


export function enqueueUpdate(
    fiber,
    update,
    lane
) {
    const updateQueue = fiber.updateQueue;
    if (updateQueue === null) {
        // Only occurs if the fiber has been unmounted.
        return;
    }

    const sharedQueue = (updateQueue).shared;

    if (isInterleavedUpdate(fiber, lane)) {
        const interleaved = sharedQueue.interleaved;
        if (interleaved === null) {
            // This is the first update. Create a circular list.
            update.next = update;
            // At the end of the current render, this queue's interleaved updates will
            // be transferred to the pending queue.
            pushInterleavedQueue(sharedQueue);
        } else {
            update.next = interleaved.next;
            interleaved.next = update;
        }
        sharedQueue.interleaved = update;
    } else {
        const pending = sharedQueue.pending;
        if (pending === null) {
            // This is the first update. Create a circular list.
            update.next = update;
        } else {
            update.next = pending.next;
            pending.next = update;
        }
        sharedQueue.pending = update;
    }

}


function checkForNestedUpdates() {
    if (nestedUpdateCount > NESTED_UPDATE_LIMIT) {
        nestedUpdateCount = 0;
        rootWithNestedUpdates = null;

        throw new Error(
            'Maximum update depth exceeded. This can happen when a component ' +
            'repeatedly calls setState inside componentWillUpdate or ' +
            'componentDidUpdate. React limits the number of nested updates to ' +
            'prevent infinite loops.',
        );
    }
}
export function mergeLanes(a, b) {
    return a | b;
}
export function removeLanes(set, subset) {
    return set & ~subset;
}

function markUpdateLaneFromFiberToRoot(
    sourceFiber,
    lane
) {
    // Update the source fiber's lanes
    sourceFiber.lanes = mergeLanes(sourceFiber.lanes, lane);
    let alternate = sourceFiber.alternate;
    if (alternate !== null) {
        alternate.lanes = mergeLanes(alternate.lanes, lane);
    }
    // Walk the parent path to the root and update the child lanes.
    let node = sourceFiber;
    let parent = sourceFiber.return;
    while (parent !== null) {
        parent.childLanes = mergeLanes(parent.childLanes, lane);
        alternate = parent.alternate;
        if (alternate !== null) {
            alternate.childLanes = mergeLanes(alternate.childLanes, lane);
        } else {
            // if (false) {
            //   if ((parent.flags & (Placement | Hydrating)) !== NoFlags) {
            //     warnAboutUpdateOnNotYetMountedFiberInDEV(sourceFiber);
            //   }
            // }
        }
        node = parent;
        parent = parent.return;
    }
    if (node.tag === HostRoot) {
        const root = node.stateNode;
        return root;
    } else {
        return null;
    }
}
const log = Math.log;
const LN2 = Math.LN2;

function clz32Fallback(x) {
    const asUint = x >>> 0;
    if (asUint === 0) {
        return 32;
    }
    return (31 - ((log(asUint) / LN2) | 0)) | 0;
}

function pickArbitraryLaneIndex(lanes) {
    return 31 - clz32Fallback(lanes);
}

function laneToIndex(lane) {
    return pickArbitraryLaneIndex(lane);
}
export function markRootUpdated(
    root,
    updateLane,
    eventTime,
) {
    root.pendingLanes |= updateLane;

    // If there are any suspended transitions, it's possible this new update
    // could unblock them. Clear the suspended lanes so that we can try rendering
    // them again.
    //
    // TODO: We really only need to unsuspend only lanes that are in the
    // `subtreeLanes` of the updated fiber, or the update lanes of the return
    // path. This would exclude suspended updates in an unrelated sibling tree,
    // since there's no way for this update to unblock it.
    //
    // We don't do this if the incoming update is idle, because we never process
    // idle updates until after all the regular updates have finished; there's no
    // way it could unblock a transition.
    if (updateLane !== IdleLane) {
        root.suspendedLanes = NoLanes;
        root.pingedLanes = NoLanes;
    }

    const eventTimes = root.eventTimes;
    const index = laneToIndex(updateLane);
    // We can always overwrite an existing timestamp because we prefer the most
    // recent event, and we assume time is monotonically increasing.
    eventTimes[index] = eventTime;
}




export function popTreeContext(workInProgress) {
    // Restore the previous values.

    // This is a bit more complicated than other context-like modules in Fiber
    // because the same Fiber may appear on the stack multiple times and for
    // different reasons. We have to keep popping until the work-in-progress is
    // no longer at the top of the stack.

    while (workInProgress === treeForkProvider) {
        treeForkProvider = forkStack[--forkStackIndex];
        forkStack[forkStackIndex] = null;
        treeForkCount = forkStack[--forkStackIndex];
        forkStack[forkStackIndex] = null;
    }

    while (workInProgress === treeContextProvider) {
        treeContextProvider = idStack[--idStackIndex];
        idStack[idStackIndex] = null;
        treeContextOverflow = idStack[--idStackIndex];
        idStack[idStackIndex] = null;
        treeContextId = idStack[--idStackIndex];
        idStack[idStackIndex] = null;
    }
}

function popContext(fiber) {
    if (disableLegacyContext) {
        return;
    } else {
        pop(didPerformWorkStackCursor, fiber);
        pop(contextStackCursor, fiber);
    }
}

function popHostContainer(fiber) {
    pop(contextStackCursor, fiber);
    pop(contextFiberStackCursor, fiber);
    pop(rootInstanceStackCursor, fiber);
}

function popTopLevelContextObject(fiber) {
    if (disableLegacyContext) {
        return;
    } else {
        pop(didPerformWorkStackCursor, fiber);
        pop(contextStackCursor, fiber);
    }
}

function popHostContext(fiber) {
    // Do not pop unless this Fiber provided the current context.
    // pushHostContext() only pushes Fibers that provide unique contexts.
    if (contextFiberStackCursor.current !== fiber) {
        return;
    }

    pop(contextStackCursor, fiber);
    pop(contextFiberStackCursor, fiber);
}

export function resetWorkInProgressVersions() {
    for (let i = 0; i < workInProgressSources.length; i++) {
        const mutableSource = workInProgressSources[i];
        if (isPrimaryRenderer) {
            mutableSource._workInProgressVersionPrimary = null;
        } else {
            mutableSource._workInProgressVersionSecondary = null;
        }
    }
    workInProgressSources.length = 0;
}
export function markRootSuspended_dontCallThisOneDirectly(root, suspendedLanes) {
    root.suspendedLanes |= suspendedLanes;
    root.pingedLanes &= ~suspendedLanes;

    // The suspended lanes are no longer CPU-bound. Clear their expiration times.
    const expirationTimes = root.expirationTimes;
    let lanes = suspendedLanes;
    while (lanes > 0) {
        const index = pickArbitraryLaneIndex(lanes);
        const lane = 1 << index;

        expirationTimes[index] = NoTimestamp;

        lanes &= ~lane;
    }
}

function markRootSuspended(root, suspendedLanes) {
    // When suspending, we should always exclude lanes that were pinged or (more
    // rarely, since we try to avoid it) updated during the render phase.
    // TODO: Lol maybe there's a better way to factor this besides this
    // obnoxiously named function :)
    suspendedLanes = removeLanes(suspendedLanes, workInProgressRootPingedLanes);
    suspendedLanes = removeLanes(
        suspendedLanes,
        workInProgressRootInterleavedUpdatedLanes,
    );
    markRootSuspended_dontCallThisOneDirectly(root, suspendedLanes);
}


function popSuspenseContext(fiber) {
    pop(suspenseStackCursor, fiber);
}
export function popProvider(
    context,
    providerFiber,
) {
    const currentValue = valueCursor.current;
    pop(valueCursor, providerFiber);
    if (isPrimaryRenderer) {
        context._currentValue = currentValue;
    } else {
        context._currentValue2 = currentValue;
    }
}

export function popRenderLanes(fiber) {
    subtreeRenderLanes = subtreeRenderLanesCursor.current;
    pop(subtreeRenderLanesCursor, fiber);
}

export function popCachePool(workInProgress) {
    if (!enableCache) {
        return;
    }

    pop(resumedCache, workInProgress);
}

export function popCacheProvider(workInProgress, cache) {
    if (!enableCache) {
        return;
    }
    popProvider(CacheContext, workInProgress);
}

function unwindInterruptedWork(
    current,
    interruptedWork,
    renderLanes
) {
    // Note: This intentionally doesn't check if we're hydrating because comparing
    // to the current tree provider fiber is just as fast and less error-prone.
    // Ideally we would have a special version of the work loop only
    // for hydration.
    popTreeContext(interruptedWork);
    switch (interruptedWork.tag) {
        case ClassComponent: {
            const childContextTypes = interruptedWork.type.childContextTypes;
            if (childContextTypes !== null && childContextTypes !== undefined) {
                popContext(interruptedWork);
            }
            break;
        }
        case HostRoot: {
            // if (enableCache) {
            //     const root = interruptedWork.stateNode;
            //     // popRootCachePool(root, renderLanes);

            //     const cache = interruptedWork.memoizedState.cache;
            //     // popCacheProvider(interruptedWork, cache);
            // }
            popHostContainer(interruptedWork);
            popTopLevelContextObject(interruptedWork);
            resetWorkInProgressVersions();
            break;
        }
        case HostComponent: {
            popHostContext(interruptedWork);
            break;
        }
        case HostPortal:
            popHostContainer(interruptedWork);
            break;
        case SuspenseComponent:
            popSuspenseContext(interruptedWork);
            break;
        case SuspenseListComponent:
            popSuspenseContext(interruptedWork);
            break;
        case ContextProvider:
            const context = interruptedWork.type._context;
            popProvider(context, interruptedWork);
            break;
        case OffscreenComponent:
        case LegacyHiddenComponent:
            popRenderLanes(interruptedWork);
            if (enableCache) {
                if (current !== null) {
                    popCachePool(interruptedWork);
                }
            }

            break;
        case CacheComponent:
            if (enableCache) {
                const cache = interruptedWork.memoizedState.cache;
                popCacheProvider(interruptedWork, cache);
            }
            break;
        default:
            break;
    }
}
export const InputContinuousHydrationLane = /*    */ 0b0000000000000000000000000000010;
export const InputContinuousLane = /*            */ 0b0000000000000000000000000000100;
const TransitionHydrationLane = /*                */ 0b0000000000000000000000000100000;
export const DefaultHydrationLane = /*            */ 0b0000000000000000000000000001000;
const TransitionLane16 = /*                       */ 0b0000000001000000000000000000000;
const RetryLane5 = /*                             */ 0b0000100000000000000000000000000;
export const SelectiveHydrationLane = /*          */ 0b0001000000000000000000000000000;
export const IdleHydrationLane = /*               */ 0b0010000000000000000000000000000;
export const OffscreenLane = /*                   */ 0b1000000000000000000000000000000;

function computeExpirationTime(lane, currentTime) {
    switch (lane) {
        case SyncLane:
        case InputContinuousHydrationLane:
        case InputContinuousLane:
            // User interactions should expire slightly more quickly.
            //
            // NOTE: This is set to the corresponding constant as in Scheduler.js.
            // When we made it larger, a product metric in www regressed, suggesting
            // there's a user interaction that's being starved by a series of
            // synchronous updates. If that theory is correct, the proper solution is
            // to fix the starvation. However, this scenario supports the idea that
            // expiration times are an important safeguard when starvation
            // does happen.
            return currentTime + 250;
        case DefaultHydrationLane:
        case DefaultLane:
        case TransitionHydrationLane:
        case TransitionLane16:
            return currentTime + 5000;
        case RetryLane5:
            // TODO: Retries should be allowed to expire if they are CPU bound for
            // too long, but when I made this change it caused a spike in browser
            // crashes. There must be some other underlying bug; not super urgent but
            // ideally should figure out why and fix it. Unfortunately we don't have
            // a repro for the crashes, only detected via production metrics.
            return NoTimestamp;
        case SelectiveHydrationLane:
        case IdleHydrationLane:
        case IdleLane:
        case OffscreenLane:
            // Anything idle priority or lower should never expire.
            return NoTimestamp;
        default:
            return NoTimestamp;
    }
}
export function markStarvedLanesAsExpired(
    root,
    currentTime
) {
    // TODO: This gets called every time we yield. We can optimize by storing
    // the earliest expiration time on the root. Then use that to quickly bail out
    // of this function.

    const pendingLanes = root.pendingLanes;
    const suspendedLanes = root.suspendedLanes;
    const pingedLanes = root.pingedLanes;
    const expirationTimes = root.expirationTimes;

    // Iterate through the pending lanes and check if we've reached their
    // expiration time. If so, we'll assume the update is being starved and mark
    // it as expired to force it to finish.
    let lanes = pendingLanes;
    while (lanes > 0) {
        const index = pickArbitraryLaneIndex(lanes);
        const lane = 1 << index;

        const expirationTime = expirationTimes[index];
        if (expirationTime === NoTimestamp) {
            // Found a pending lane with no expiration time. If it's not suspended, or
            // if it's pinged, assume it's CPU-bound. Compute a new expiration time
            // using the current time.
            if (
                (lane & suspendedLanes) === NoLanes ||
                (lane & pingedLanes) !== NoLanes
            ) {
                // Assumes timestamps are monotonically increasing.
                expirationTimes[index] = computeExpirationTime(lane, currentTime);
            }
        } else if (expirationTime <= currentTime) {
            // This lane expired
            root.expiredLanes |= lane;
        }

        lanes &= ~lane;
    }
}
// export function getHighestPriorityLane(lanes) {
//     return lanes & -lanes;
// }
const TransitionLanes = /*                       */ 0b0000000001111111111111111000000;
const RetryLanes = /*                            */ 0b0000111110000000000000000000000;

function getHighestPriorityLanes(lanes) {
    switch (getHighestPriorityLane(lanes)) {
        case SyncLane:
            return SyncLane;
        case InputContinuousHydrationLane:
            return InputContinuousHydrationLane;
        case InputContinuousLane:
            return InputContinuousLane;
        case DefaultHydrationLane:
            return DefaultHydrationLane;
        case DefaultLane:
            return DefaultLane;
        case TransitionHydrationLane:
            return TransitionHydrationLane;
        case TransitionLane1:
        case TransitionLane16:
            return lanes & TransitionLanes;
        case RetryLane1:
        case RetryLane5:
            return lanes & RetryLanes;
        case SelectiveHydrationLane:
            return SelectiveHydrationLane;
        case IdleHydrationLane:
            return IdleHydrationLane;
        case IdleLane:
            return IdleLane;
        case OffscreenLane:
            return OffscreenLane;
        default:
            // This shouldn't be reachable, but as a fallback, return the entire bitmask.
            return lanes;
    }
}
export function getNextLanes(root, wipLanes) {
    // Early bailout if there's no pending work left.
    const pendingLanes = root.pendingLanes;
    if (pendingLanes === NoLanes) {
        return NoLanes;
    }

    let nextLanes = NoLanes;

    const suspendedLanes = root.suspendedLanes;
    const pingedLanes = root.pingedLanes;

    // Do not work on any idle work until all the non-idle work has finished,
    // even if the work is suspended.
    const nonIdlePendingLanes = pendingLanes & NonIdleLanes;
    if (nonIdlePendingLanes !== NoLanes) {
        const nonIdleUnblockedLanes = nonIdlePendingLanes & ~suspendedLanes;
        if (nonIdleUnblockedLanes !== NoLanes) {
            nextLanes = getHighestPriorityLanes(nonIdleUnblockedLanes);
        } else {
            const nonIdlePingedLanes = nonIdlePendingLanes & pingedLanes;
            if (nonIdlePingedLanes !== NoLanes) {
                nextLanes = getHighestPriorityLanes(nonIdlePingedLanes);
            }
        }
    } else {
        // The only remaining work is Idle.
        const unblockedLanes = pendingLanes & ~suspendedLanes;
        if (unblockedLanes !== NoLanes) {
            nextLanes = getHighestPriorityLanes(unblockedLanes);
        } else {
            if (pingedLanes !== NoLanes) {
                nextLanes = getHighestPriorityLanes(pingedLanes);
            }
        }
    }

    if (nextLanes === NoLanes) {
        // This should only be reachable if we're suspended
        // TODO: Consider warning in this path if a fallback timer is not scheduled.
        return NoLanes;
    }

    // If we're already in the middle of a render, switching lanes will interrupt
    // it and we'll lose our progress. We should only do this if the new lanes are
    // higher priority.
    if (
        wipLanes !== NoLanes &&
        wipLanes !== nextLanes &&
        // If we already suspended with a delay, then interrupting is fine. Don't
        // bother waiting until the root is complete.
        (wipLanes & suspendedLanes) === NoLanes
    ) {
        const nextLane = getHighestPriorityLane(nextLanes);
        const wipLane = getHighestPriorityLane(wipLanes);
        if (
            // Tests whether the next lane is equal or lower priority than the wip
            // one. This works because the bits decrease in priority as you go left.
            nextLane >= wipLane ||
            // Default priority updates should not interrupt transition updates. The
            // only difference between default updates and transition updates is that
            // default updates do not support refresh transitions.
            (nextLane === DefaultLane && (wipLane & TransitionLanes) !== NoLanes)
        ) {
            // Keep working on the existing in-progress tree. Do not interrupt.
            return wipLanes;
        }
    }

    // Check for entangled lanes and add them to the batch.
    //
    // A lane is said to be entangled with another when it's not allowed to render
    // in a batch that does not also include the other lane. Typically we do this
    // when multiple updates have the same source, and we only want to respond to
    // the most recent event from that source.
    //
    // Note that we apply entanglements *after* checking for partial work above.
    // This means that if a lane is entangled during an interleaved event while
    // it's already rendering, we won't interrupt it. This is intentional, since
    // entanglement is usually "best effort": we'll try our best to render the
    // lanes in the same batch, but it's not worth throwing out partially
    // completed work in order to do it.
    // TODO: Reconsider this. The counter-argument is that the partial work
    // represents an intermediate state, which we don't want to show to the user.
    // And by spending extra time finishing it, we're increasing the amount of
    // time it takes to show the final state, which is what they are actually
    // waiting for.
    //
    // For those exceptions where entanglement is semantically important, like
    // useMutableSource, we should ensure that there is no partial work at the
    // time we apply the entanglement.
    const entangledLanes = root.entangledLanes;
    if (entangledLanes !== NoLanes) {
        const entanglements = root.entanglements;
        let lanes = nextLanes & entangledLanes;
        while (lanes > 0) {
            const index = pickArbitraryLaneIndex(lanes);
            const lane = 1 << index;

            nextLanes |= entanglements[index];

            lanes &= ~lane;
        }
    }

    return nextLanes;
}

function Scheduler_cancelCallback(task) {
    if (enableProfiling) {
        if (task.isQueued) {
            const currentTime = getCurrentTime();
            // markTaskCanceled(task, currentTime);
            task.isQueued = false;
        }
    }

    // Null out the callback to indicate the task has been canceled. (Can't
    // remove from the queue because you can't remove arbitrary nodes from an
    // array based heap, only the first one.)
    task.callback = null;
}

function cancelCallback(callbackNode) {
    // In production, always call Scheduler. This function will be stripped out.
    return Scheduler_cancelCallback(callbackNode);
}


let syncQueue = null;
let includesLegacySyncCallbacks = false;
let isFlushingSyncQueue = false;

export function scheduleSyncCallback(callback) {
    // Push this callback into an internal queue. We'll flush these either in
    // the next tick, or earlier if something calls `flushSyncCallbackQueue`.
    if (syncQueue === null) {
        syncQueue = [callback];
    } else {
        // Push onto existing queue. Don't need to schedule a callback because
        // we already scheduled one when we created the queue.
        syncQueue.push(callback);
    }
}

export const DiscreteEventPriority = SyncLane;
export const ContinuousEventPriority = InputContinuousLane;
export const DefaultEventPriority = DefaultLane;
export const IdleEventPriority = IdleLane;
export function isHigherEventPriority(
    a,
    b,
) {
    return a !== 0 && a < b;
}
export function scheduleLegacySyncCallback(callback) {
    includesLegacySyncCallbacks = true;
    scheduleSyncCallback(callback);
}

export function lanesToEventPriority(lanes) {
    const lane = getHighestPriorityLane(lanes);
    if (!isHigherEventPriority(DiscreteEventPriority, lane)) {
        return DiscreteEventPriority;
    }
    if (!isHigherEventPriority(ContinuousEventPriority, lane)) {
        return ContinuousEventPriority;
    }
    if (includesNonIdleWork(lane)) {
        return DefaultEventPriority;
    }
    return IdleEventPriority;
}

// const NoPriority = 0;
// const ImmediatePriority = 1;
// const UserBlockingPriority = 2;
// const NormalPriority = 3;
// const LowPriority = 4;
// const IdlePriority = 5;
function unstable_scheduleCallback(priorityLevel, callback, options) {
    var currentTime = getCurrentTime();

    var startTime;
    if (typeof options === 'object' && options !== null) {
        var delay = options.delay;
        if (typeof delay === 'number' && delay > 0) {
            startTime = currentTime + delay;
        } else {
            startTime = currentTime;
        }
    } else {
        startTime = currentTime;
    }
    var maxSigned31BitInt = 1073741823;

    // Times out immediately
    var IMMEDIATE_PRIORITY_TIMEOUT = -1;
    // Eventually times out
    var USER_BLOCKING_PRIORITY_TIMEOUT = 250;
    var NORMAL_PRIORITY_TIMEOUT = 5000;
    var LOW_PRIORITY_TIMEOUT = 10000;
    // Never times out
    var IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt;
    var timeout;
    switch (priorityLevel) {
        case ImmediatePriority:
            timeout = IMMEDIATE_PRIORITY_TIMEOUT;
            break;
        case UserBlockingPriority:
            timeout = USER_BLOCKING_PRIORITY_TIMEOUT;
            break;
        case IdlePriority:
            timeout = IDLE_PRIORITY_TIMEOUT;
            break;
        case LowPriority:
            timeout = LOW_PRIORITY_TIMEOUT;
            break;
        case NormalPriority:
        default:
            timeout = NORMAL_PRIORITY_TIMEOUT;
            break;
    }

    var expirationTime = startTime + timeout;

    var newTask = {
        id: taskIdCounter++,
        callback,
        priorityLevel,
        startTime,
        expirationTime,
        sortIndex: -1,
    };
    // if (enableProfiling) {
    //   newTask.isQueued = false;
    // }

    if (startTime > currentTime) {
        // This is a delayed task.
        newTask.sortIndex = startTime;
        push(timerQueue, newTask);
        //   if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
        //     // All tasks are delayed, and this is the task with the earliest delay.
        //     if (isHostTimeoutScheduled) {
        //       // Cancel an existing timeout.
        //       cancelHostTimeout();
        //     } else {
        //       isHostTimeoutScheduled = true;
        //     }
        //     // Schedule a timeout.
        //     requestHostTimeout(handleTimeout, startTime - currentTime);
        //   }
    } else {
        newTask.sortIndex = expirationTime;
        push(taskQueue, newTask);
        //   if (enableProfiling) {
        //     markTaskStart(newTask, currentTime);
        //     newTask.isQueued = true;
        //   }
        // Schedule a host callback, if needed. If we're already performing work,
        // wait until the next time we yield.
        //   if (!isHostCallbackScheduled && !isPerformingWork) {
        //     isHostCallbackScheduled = true;
        //     requestHostCallback(flushWork);
        //   }
    }

    return newTask;
}


function scheduleCallback(priorityLevel, callback) {
    return unstable_scheduleCallback(priorityLevel, callback);
}

function ensureRootIsScheduled(root, currentTime) {
    const existingCallbackNode = root.callbackNode;

    // Check if any lanes are being starved by other work. If so, mark them as
    // expired so we know to work on those next.
    markStarvedLanesAsExpired(root, currentTime);

    // Determine the next lanes to work on, and their priority.
    const nextLanes = getNextLanes(
        root,
        root === workInProgressRoot ? workInProgressRootRenderLanes : NoLanes,
    );

    if (nextLanes === NoLanes) {
        // Special case: There's nothing to work on.
        if (existingCallbackNode !== null) {
            cancelCallback(existingCallbackNode);
        }
        root.callbackNode = null;
        root.callbackPriority = NoLane;
        return;
    }

    // We use the highest priority lane to represent the priority of the callback.
    const newCallbackPriority = getHighestPriorityLane(nextLanes);

    // Check if there's an existing task. We may be able to reuse it.
    const existingCallbackPriority = root.callbackPriority;

    if (existingCallbackNode != null) {
        // Cancel the existing callback. We'll schedule a new one below.
        cancelCallback(existingCallbackNode);
    }

    // Schedule a new callback.
    let newCallbackNode;
    if (newCallbackPriority === SyncLane) {
        // Special case: Sync React callbacks are scheduled on a special
        // internal queue
        if (root.tag === LegacyRoot) {
            scheduleLegacySyncCallback(performConcurrentWorkOnRoot.bind(null, root));
        } else {
            scheduleSyncCallback(performConcurrentWorkOnRoot.bind(null, root));
        }
        //   if (supportsMicrotasks) {
        //       scheduleMicrotask(() => {
        //         // In Safari, appending an iframe forces microtasks to run.
        //         // https://github.com/facebook/react/issues/22459
        //         // We don't support running callbacks in the middle of render
        //         // or commit so we need to check against that.
        //         if (executionContext === NoContext) {
        //           // It's only safe to do this conditionally because we always
        //           // check for pending work before we exit the task.
        //           flushSyncCallbacks();
        //         }
        //       });
        //   } else {
        //     // Flush the queue in an Immediate task.
        // scheduleCallback(ImmediatePriority, flushSyncCallbacks);
        //   }
        newCallbackNode = null;
    } else {
        let schedulerPriorityLevel;

        switch (lanesToEventPriority(nextLanes)) {
            case DiscreteEventPriority:
                schedulerPriorityLevel = ImmediatePriority;
                break;
            case ContinuousEventPriority:
                schedulerPriorityLevel = UserBlockingPriority;
                break;
            case DefaultEventPriority:
                schedulerPriorityLevel = NormalPriority;
                break;
            case IdleEventPriority:
                schedulerPriorityLevel = IdlePriority;
                break;
            default:
                schedulerPriorityLevel = NormalPriority;
                break;
        }
        newCallbackNode = scheduleCallback(
            schedulerPriorityLevel,
            // 需要写！！！！！
            performConcurrentWorkOnRoot.bind(null, root),
        );
    }

    root.callbackPriority = newCallbackPriority;
    root.callbackNode = newCallbackNode;
}

export function enqueueInterleavedUpdates() {
    // Transfer the interleaved updates onto the main queue. Each queue has a
    // `pending` field and an `interleaved` field. When they are not null, they
    // point to the last node in a circular linked list. We need to append the
    // interleaved list to the end of the pending list by joining them into a
    // single, circular list.
    if (interleavedQueues !== null) {
        for (let i = 0; i < interleavedQueues.length; i++) {
            const queue = interleavedQueues[i];
            const lastInterleavedUpdate = queue.interleaved;
            if (lastInterleavedUpdate !== null) {
                queue.interleaved = null;
                const firstInterleavedUpdate = lastInterleavedUpdate.next;
                const lastPendingUpdate = queue.pending;
                if (lastPendingUpdate !== null) {
                    const firstPendingUpdate = lastPendingUpdate.next;
                    lastPendingUpdate.next = (firstInterleavedUpdate);
                    lastInterleavedUpdate.next = (firstPendingUpdate);
                }
                queue.pending = (lastInterleavedUpdate);
            }
        }
        interleavedQueues = null;
    }
}

export function createWorkInProgress(current, pendingProps) {
    let workInProgress = current.alternate;
    if (workInProgress === null) {
        // We use a double buffering pooling technique because we know that we'll
        // only ever need at most two versions of a tree. We pool the "other" unused
        // node that we're free to reuse. This is lazily created to avoid allocating
        // extra objects for things that are never updated. It also allow us to
        // reclaim the extra memory if needed.
        workInProgress = createFiber(
            current.tag,
            pendingProps,
            current.key,
            current.mode,
        );
        workInProgress.elementType = current.elementType;
        workInProgress.type = current.type;
        workInProgress.stateNode = current.stateNode;

        workInProgress.alternate = current;
        current.alternate = workInProgress;
    } else {
        workInProgress.pendingProps = pendingProps;
        // Needed because Blocks store data on type.
        workInProgress.type = current.type;

        // We already have an alternate.
        // Reset the effect tag.
        workInProgress.flags = NoFlags;

        // The effects are no longer valid.
        workInProgress.subtreeFlags = NoFlags;
        workInProgress.deletions = null;

        //   if (enableProfilerTimer) {
        //     // We intentionally reset, rather than copy, actualDuration & actualStartTime.
        //     // This prevents time from endlessly accumulating in new commits.
        //     // This has the downside of resetting values for different priority renders,
        //     // But works for yielding (the common case) and should support resuming.
        //     workInProgress.actualDuration = 0;
        //     workInProgress.actualStartTime = -1;
        //   }
    }

    // Reset all effects except static ones.
    // Static effects are not specific to a render.
    workInProgress.flags = current.flags & StaticMask;
    workInProgress.childLanes = current.childLanes;
    workInProgress.lanes = current.lanes;

    workInProgress.child = current.child;
    workInProgress.memoizedProps = current.memoizedProps;
    workInProgress.memoizedState = current.memoizedState;
    workInProgress.updateQueue = current.updateQueue;

    // Clone the dependencies object. This is mutated during the render phase, so
    // it cannot be shared with the current fiber.
    const currentDependencies = current.dependencies;
    workInProgress.dependencies =
        currentDependencies === null ?
        null : {
            lanes: currentDependencies.lanes,
            firstContext: currentDependencies.firstContext,
        };

    // These will be overridden during the parent's reconciliation
    workInProgress.sibling = current.sibling;
    workInProgress.index = current.index;
    workInProgress.ref = current.ref;

    // if (enableProfilerTimer) {
    //     workInProgress.selfBaseDuration = current.selfBaseDuration;
    //     workInProgress.treeBaseDuration = current.treeBaseDuration;
    // }



    return workInProgress;
}

function prepareFreshStack(root, lanes) {
    root.finishedWork = null;
    root.finishedLanes = NoLanes;
    const timeoutHandle = root.timeoutHandle;
    if (timeoutHandle !== noTimeout) {
        // The root previous suspended and scheduled a timeout to commit a fallback
        // state. Now that we have additional work, cancel the timeout.
        root.timeoutHandle = noTimeout;
        // $FlowFixMe Complains noTimeout is not a TimeoutID, despite the check above
        //   cancelTimeout(timeoutHandle);
    }

    if (workInProgress !== null) {
        let interruptedWork = workInProgress.return;
        while (interruptedWork !== null) {
            const current = interruptedWork.alternate;
            unwindInterruptedWork(
                current,
                interruptedWork,
                workInProgressRootRenderLanes,
            );
            interruptedWork = interruptedWork.return;
        }
    }
    workInProgressRoot = root;
    workInProgress = createWorkInProgress(root.current, null);
    workInProgressRootRenderLanes = subtreeRenderLanes = workInProgressRootIncludedLanes = lanes;
    workInProgressRootExitStatus = RootInProgress;
    workInProgressRootFatalError = null;
    workInProgressRootSkippedLanes = NoLanes;
    workInProgressRootInterleavedUpdatedLanes = NoLanes;
    workInProgressRootRenderPhaseUpdatedLanes = NoLanes;
    workInProgressRootPingedLanes = NoLanes;
    workInProgressRootConcurrentErrors = null;
    workInProgressRootRecoverableErrors = null;

    enqueueInterleavedUpdates();


}

export function scheduleUpdateOnFiber(
    fiber,
    lane,
    eventTime,
) {
    checkForNestedUpdates();

    const root = markUpdateLaneFromFiberToRoot(fiber, lane);
    if (root === null) {
        return null;
    }

    // Mark that the root has a pending update.
    markRootUpdated(root, lane, eventTime);

    if (
        (executionContext & RenderContext) !== NoLanes &&
        root === workInProgressRoot
    ) {
        // This update was dispatched during the render phase. This is a mistake
        // if the update originates from user space (with the exception of local
        // hook updates, which are handled differently and don't reach this
        // function), but there are some internal React features that use this as
        // an implementation detail, like selective hydration.
        // warnAboutRenderPhaseUpdatesInDEV(fiber);

        // Track lanes that were updated during the render phase
        workInProgressRootRenderPhaseUpdatedLanes = mergeLanes(
            workInProgressRootRenderPhaseUpdatedLanes,
            lane,
        );
    } else {
        // This is a normal update, scheduled from outside the render phase. For
        // example, during an input event.
        if (enableUpdaterTracking) {
            // if (isDevToolsPresent) {
            //     addFiberToLanesMap(root, fiber, lane);
            // }
        }

        // warnIfUpdatesNotWrappedWithActDEV(fiber);
        const enableProfilerTimer = false,
            enableProfilerNestedUpdateScheduledHook = false,
            rootCommittingMutationOrLayoutEffects = false;
        if (enableProfilerTimer && enableProfilerNestedUpdateScheduledHook) {
            if (
                (executionContext & CommitContext) !== NoContext &&
                root === rootCommittingMutationOrLayoutEffects
            ) {
                if (fiber.mode & ProfileMode) {
                    let current = fiber;
                    while (current !== null) {
                        if (current.tag === Profiler) {
                            const {
                                id,
                                onNestedUpdateScheduled
                            } = current.memoizedProps;
                            if (typeof onNestedUpdateScheduled === 'function') {
                                onNestedUpdateScheduled(id);
                            }
                        }
                        current = current.return;
                    }
                }
            }
        }

        if (root.isDehydrated && root.tag !== LegacyRoot) {
            // This root's shell hasn't hydrated yet. Revert to client rendering.
            if (workInProgressRoot === root) {
                // If this happened during an interleaved event, interrupt the
                // in-progress hydration. Theoretically, we could attempt to force a
                // synchronous hydration before switching to client rendering, but the
                // most common reason the shell hasn't hydrated yet is because it
                // suspended. So it's very likely to suspend again anyway. For
                // simplicity, we'll skip that atttempt and go straight to
                // client rendering.
                //
                // Another way to model this would be to give the initial hydration its
                // own special lane. However, it may not be worth adding a lane solely
                // for this purpose, so we'll wait until we find another use case before
                // adding it.
                //
                // TODO: Consider only interrupting hydration if the priority of the
                // update is higher than default.
                prepareFreshStack(root, NoLanes);
            }
            root.isDehydrated = false;
            const error = new Error(
                'This root received an early update, before anything was able ' +
                'hydrate. Switched the entire root to client rendering.',
            );
            const onRecoverableError = root.onRecoverableError;
            onRecoverableError(error);
        } else if (root === workInProgressRoot) {
            // TODO: Consolidate with `isInterleavedUpdate` check

            // Received an update to a tree that's in the middle of rendering. Mark
            // that there was an interleaved update work on this root. Unless the
            // `deferRenderPhaseUpdateToNextBatch` flag is off and this is a render
            // phase update. In that case, we don't treat render phase updates as if
            // they were interleaved, for backwards compat reasons.
            if (
                deferRenderPhaseUpdateToNextBatch ||
                (executionContext & RenderContext) === NoContext
            ) {
                workInProgressRootInterleavedUpdatedLanes = mergeLanes(
                    workInProgressRootInterleavedUpdatedLanes,
                    lane,
                );
            }
            if (workInProgressRootExitStatus === RootSuspendedWithDelay) {
                // The root already suspended with a delay, which means this render
                // definitely won't finish. Since we have a new update, let's mark it as
                // suspended now, right before marking the incoming update. This has the
                // effect of interrupting the current render and switching to the update.
                // TODO: Make sure this doesn't override pings that happen while we've
                // already started rendering.
                markRootSuspended(root, workInProgressRootRenderLanes);
            }
        }

        ensureRootIsScheduled(root, eventTime);
        // if (
        //     lane === SyncLane &&
        //     executionContext === NoContext &&
        //     (fiber.mode & ConcurrentMode) === NoMode &&
        //     // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        //     !(false && ReactCurrentActQueue.isBatchingLegacy)
        // ) {
        //     // Flush the synchronous work now, unless we're already working or inside
        //     // a batch. This is intentionally inside scheduleUpdateOnFiber instead of
        //     // scheduleCallbackForFiber to preserve the ability to schedule a callback
        //     // without immediately flushing it. We only do this for user-initiated
        //     // updates, to preserve historical behavior of legacy mode.
        //     resetRenderTimer();
        //     flushSyncCallbacksOnlyInLegacyMode();
        // }
    }
    return root;
}


export function updateContainer(
    element,
    container,
    parentComponent,
    callback
) {
    const current = container.current;
    const eventTime = requestEventTime();
    const lane = requestUpdateLane(current);

    if (enableSchedulingProfiler) {
        markRenderScheduled(lane);
    }

    // const context = getContextForSubtree(parentComponent);
    // if (container.context === null) {
    //     container.context = context;
    // } else {
    //     container.pendingContext = context;
    // }



    const update = createUpdate(eventTime, lane);
    // Caution: React DevTools currently depends on this property
    // being called "element".
    update.payload = {
        element
    };

    callback = callback === undefined ? null : callback;
    if (callback !== null) {
        update.callback = callback;
    }

    enqueueUpdate(current, update, lane);
    const root = scheduleUpdateOnFiber(current, lane, eventTime);
    // if (root !== null) {
    //     entangleTransitions(root, current, lane);
    // }

    return lane;
}



export function lowerEventPriority(
    a,
    b,
) {
    return a === 0 || a > b ? a : b;
}
export function releaseCache(cache) {
    if (!enableCache) {
        return;
    }
    cache.refCount--;
    if (cache.refCount === 0) {
        scheduleCallback(NormalPriority, () => {
            cache.controller.abort();
        });
    }
}

function releaseRootPooledCache(root, remainingLanes) {
    if (enableCache) {
        const pooledCacheLanes = (root.pooledCacheLanes &= remainingLanes);
        if (pooledCacheLanes === NoLanes) {
            // None of the remaining work relies on the cache pool. Clear it so
            // subsequent requests get a new cache
            const pooledCache = root.pooledCache;
            if (pooledCache != null) {
                root.pooledCache = null;
                releaseCache(pooledCache);
            }
        }
    }
}

function flushPassiveEffectsImpl() {
    return false
    // if (rootWithPendingPassiveEffects === null) {
    //   return false;
    // }

    // const root = rootWithPendingPassiveEffects;
    // const lanes = pendingPassiveEffectsLanes;
    // rootWithPendingPassiveEffects = null;
    // // TODO: This is sometimes out of sync with rootWithPendingPassiveEffects.
    // // Figure out why and fix it. It's not causing any known issues (probably
    // // because it's only used for profiling), but it's a refactor hazard.
    // pendingPassiveEffectsLanes = NoLanes;

    // if ((executionContext & (RenderContext | CommitContext)) !== NoContext) {
    //   throw new Error('Cannot flush passive effects while already rendering.');
    // }

    // const prevExecutionContext = executionContext;
    // executionContext |= CommitContext;

    // commitPassiveUnmountEffects(root.current);
    // commitPassiveMountEffects(root, root.current);

    // // TODO: Move to commitPassiveMountEffects
    // if (enableProfilerTimer && enableProfilerCommitHooks) {
    //   const profilerEffects = pendingPassiveProfilerEffects;
    //   pendingPassiveProfilerEffects = [];
    //   for (let i = 0; i < profilerEffects.length; i++) {
    //     const fiber = ((profilerEffects[i]));
    //     commitPassiveEffectDurations(root, fiber);
    //   }
    // }



    // executionContext = prevExecutionContext;

    // flushSyncCallbacks();

    // // If additional passive effects were scheduled, increment a counter. If this
    // // exceeds the limit, we'll fire a warning.
    // nestedPassiveUpdateCount =
    //   rootWithPendingPassiveEffects === null ? 0 : nestedPassiveUpdateCount + 1;

    // // TODO: Move to commitPassiveMountEffects
    // onPostCommitRootDevTools(root);
    // if (enableProfilerTimer && enableProfilerCommitHooks) {
    //   const stateNode = root.current.stateNode;
    //   stateNode.effectDuration = 0;
    //   stateNode.passiveEffectDuration = 0;
    // }

    // return true;
}
export function flushPassiveEffects() {
    // Returns whether passive effects were flushed.
    // TODO: Combine this check with the one in flushPassiveEFfectsImpl. We should
    // probably just combine the two functions. I believe they were only separate
    // in the first place because we used to wrap it with
    // `Scheduler.runWithPriority`, which accepts a function. But now we track the
    // priority within React itself, so we can mutate the variable directly.
    if (rootWithPendingPassiveEffects !== null) {
        // Cache the root since rootWithPendingPassiveEffects is cleared in
        // flushPassiveEffectsImpl
        const root = rootWithPendingPassiveEffects;
        // Cache and clear the remaining lanes flag; it must be reset since this
        // method can be called from various places, not always from commitRoot
        // where the remaining lanes are known
        const remainingLanes = pendingPassiveEffectsRemainingLanes;
        pendingPassiveEffectsRemainingLanes = NoLanes;

        const renderPriority = lanesToEventPriority(pendingPassiveEffectsLanes);
        const priority = lowerEventPriority(DefaultEventPriority, renderPriority);
        const prevTransition = ReactCurrentBatchConfig.transition;
        const previousPriority = getCurrentUpdatePriority();
        try {
            ReactCurrentBatchConfig.transition = null;
            setCurrentUpdatePriority(priority);
            return flushPassiveEffectsImpl();
        } finally {
            setCurrentUpdatePriority(previousPriority);
            ReactCurrentBatchConfig.transition = prevTransition;

            // Once passive effects have run for the tree - giving components a
            // chance to retain cache instances they use - release the pooled
            // cache at the root (if there is one)
            releaseRootPooledCache(root, remainingLanes);
        }
    }
    return false;
}

function performConcurrentWorkOnRoot(root, didTimeout) {
    return '';
    // // if (enableProfilerTimer && enableProfilerNestedUpdatePhase) {
    // //   resetNestedUpdateFlag();
    // // }

    // // Since we know we're in a React event, we can clear the current
    // // event time. The next update will compute a new event time.
    // currentEventTime = NoTimestamp;
    // currentEventTransitionLane = NoLanes;

    // if ((executionContext & (RenderContext | CommitContext)) !== NoContext) {
    //   throw new Error('Should not already be working.');
    // }

    // // Flush any pending passive effects before deciding which lanes to work on,
    // // in case they schedule additional work.
    // const originalCallbackNode = root.callbackNode;
    // const didFlushPassiveEffects = flushPassiveEffects();
    // if (didFlushPassiveEffects) {
    //   // Something in the passive effect phase may have canceled the current task.
    //   // Check if the task node for this root was changed.
    //   if (root.callbackNode !== originalCallbackNode) {
    //     // The current task was canceled. Exit. We don't need to call
    //     // `ensureRootIsScheduled` because the check above implies either that
    //     // there's a new task, or that there's no remaining work on this root.
    //     return null;
    //   } else {
    //     // Current task was not canceled. Continue.
    //   }
    // }

    // // Determine the next lanes to work on, using the fields stored
    // // on the root.
    // let lanes = getNextLanes(
    //   root,
    //   root === workInProgressRoot ? workInProgressRootRenderLanes : NoLanes,
    // );
    // if (lanes === NoLanes) {
    //   // Defensive coding. This is never expected to happen.
    //   return null;
    // }

    // // We disable time-slicing in some cases: if the work has been CPU-bound
    // // for too long ("expired" work, to prevent starvation), or we're in
    // // sync-updates-by-default mode.
    // // TODO: We only check `didTimeout` defensively, to account for a Scheduler
    // // bug we're still investigating. Once the bug in Scheduler is fixed,
    // // we can remove this, since we track expiration ourselves.
    // const shouldTimeSlice =
    //   !includesBlockingLane(root, lanes) &&
    //   !includesExpiredLane(root, lanes) &&
    //   (disableSchedulerTimeoutInWorkLoop || !didTimeout);
    // let exitStatus = shouldTimeSlice
    //   ? renderRootConcurrent(root, lanes)
    //   : renderRootSync(root, lanes);
    // if (exitStatus !== RootInProgress) {
    //   if (exitStatus === RootErrored) {
    //     // If something threw an error, try rendering one more time. We'll
    //     // render synchronously to block concurrent data mutations, and we'll
    //     // includes all pending updates are included. If it still fails after
    //     // the second attempt, we'll give up and commit the resulting tree.
    //     const errorRetryLanes = getLanesToRetrySynchronouslyOnError(root);
    //     if (errorRetryLanes !== NoLanes) {
    //       lanes = errorRetryLanes;
    //       exitStatus = recoverFromConcurrentError(root, errorRetryLanes);
    //     }
    //   }
    //   if (exitStatus === RootFatalErrored) {
    //     const fatalError = workInProgressRootFatalError;
    //     prepareFreshStack(root, NoLanes);
    //     markRootSuspended(root, lanes);
    //     ensureRootIsScheduled(root, now());
    //     throw fatalError;
    //   }

    //   if (exitStatus === RootDidNotComplete) {
    //     // The render unwound without completing the tree. This happens in special
    //     // cases where need to exit the current render without producing a
    //     // consistent tree or committing.
    //     //
    //     // This should only happen during a concurrent render, not a discrete or
    //     // synchronous update. We should have already checked for this when we
    //     // unwound the stack.
    //     markRootSuspended(root, lanes);
    //   } else {
    //     // The render completed.

    //     // Check if this render may have yielded to a concurrent event, and if so,
    //     // confirm that any newly rendered stores are consistent.
    //     // TODO: It's possible that even a concurrent render may never have yielded
    //     // to the main thread, if it was fast enough, or if it expired. We could
    //     // skip the consistency check in that case, too.
    //     const renderWasConcurrent = !includesBlockingLane(root, lanes);
    //     const finishedWork = (root.current.alternate);
    //     if (
    //       renderWasConcurrent &&
    //       !isRenderConsistentWithExternalStores(finishedWork)
    //     ) {
    //       // A store was mutated in an interleaved event. Render again,
    //       // synchronously, to block further mutations.
    //       exitStatus = renderRootSync(root, lanes);

    //       // We need to check again if something threw
    //       if (exitStatus === RootErrored) {
    //         const errorRetryLanes = getLanesToRetrySynchronouslyOnError(root);
    //         if (errorRetryLanes !== NoLanes) {
    //           lanes = errorRetryLanes;
    //           exitStatus = recoverFromConcurrentError(root, errorRetryLanes);
    //           // We assume the tree is now consistent because we didn't yield to any
    //           // concurrent events.
    //         }
    //       }
    //       if (exitStatus === RootFatalErrored) {
    //         const fatalError = workInProgressRootFatalError;
    //         prepareFreshStack(root, NoLanes);
    //         markRootSuspended(root, lanes);
    //         ensureRootIsScheduled(root, now());
    //         throw fatalError;
    //       }
    //     }

    //     // We now have a consistent tree. The next step is either to commit it,
    //     // or, if something suspended, wait to commit it after a timeout.
    //     root.finishedWork = finishedWork;
    //     root.finishedLanes = lanes;
    //     finishConcurrentRender(root, exitStatus, lanes);
    //   }
    // }

    // ensureRootIsScheduled(root, now());
    // if (root.callbackNode === originalCallbackNode) {
    //   // The task node scheduled for this root is the same one that's
    //   // currently executed. Need to return a continuation.
    //   return performConcurrentWorkOnRoot.bind(null, root);
    // }
    // return null;
}