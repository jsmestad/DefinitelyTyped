// Type definitions for phoenix_live_view 0.15
// Project: https://github.com/phoenixframework/phoenix_live_view
// Definitions by: Peter Zingg <https://github.com/pzingg>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// Version 0.15.4 added options and interfaces for LiveView uploads
// See: https://hexdocs.pm/phoenix_live_view/uploads.html

import { Socket, SocketConnectOption } from 'phoenix';

export interface Defaults {
  debounce?: number | undefined;
  throttle?: number | undefined;
}

// From morphdom
export interface DomOptions {
  getNodeKey?: ((node: Node) => any) | undefined;
  onBeforeNodeAdded?: ((node: Node) => Node) | undefined;
  onNodeAdded?: ((node: Node) => Node) | undefined;
  onBeforeElUpdated?: ((fromEl: HTMLElement, toEl: HTMLElement) => boolean) | undefined;
  onElUpdated?: ((el: HTMLElement) => void) | undefined;
  onBeforeNodeDiscarded?: ((node: Node) => boolean) | undefined;
  onNodeDiscarded?: ((node: Node) => void) | undefined;
  onBeforeElChildrenUpdated?: ((fromEl: HTMLElement, toEl: HTMLElement) => boolean) | undefined;
  childrenOnly?: boolean | undefined;
}

export type ViewLogger = (view: View, kind: string, msg: any, obj: any) => void;

export interface SocketOptions {
  bindingPrefix?: string | undefined;
  defaults?: Defaults | undefined;
  dom?: DomOptions | undefined;
  hooks?: object | undefined;
  loaderTimeout?: number | undefined;
  params?: object | undefined;
  uploaders?: object | undefined;
  viewLogger?: ViewLogger | undefined;
}

export type BindCallback = (e: Event, event: string, view: View, el: HTMLElement, targetCtx: object, phxEvent: string, windowOwner?: string) => void;

export class LiveSocket {
  // phxSocket should be the Socket class (LiveSocket will use the constructor)
  constructor(url: string, phxSocket: any, opts: SocketOptions);

  // public
  connect(): void;
  disableDebug(): void;
  disableLatencySim(): void;
  disableProfiling(): void;
  disconnect(callback: any): void;
  enableDebug(): void;
  enableLatencySim(upperBoundMs: number): void;
  enableProfiling(): void;
  getLatencySim(): number | null;
  getSocket(): Socket;
  isDebugEnabled(): boolean;
  isProfileEnabled(): boolean;

  // private
  // bind(events: string[], callback: BindCallback): void;
  // bindClick(eventName: string, bindingName: string, capture: boolean): void;
  // bindClicks(): void;
  // bindForms(): void;
  // binding(kind: string): string;
  // bindNav(): void;
  // bindTopLevelEvents(): void;
  // blurActiveElement(): void;
  // channel(topic: string, params: any): Channel;
  // commitPendingLink(linkRef: number): boolean;
  // debounce(el: HTMLElement, event: Event, callback: any): void;
  // destroyAllViews(): void;
  // destroyViewByEl(el: HTMLElement): void;
  // dropActiveElement(view: View): void;
  // eventMeta(eventName: string, e: Event, targetEl: HTMLElement): object;
  // getActiveElement(): Element;
  // getBindingPrefix(): string;
  // getHookCallbacks(hookName: string): any;
  // getHref(): string;
  // getRootById(id: string): any;
  // getViewByEl(el: HTMLElement): any;
  // hasPendingLink(): boolean;
  // historyPatch(href: string, linkState: string): void;
  // historyRedirect(href: string, linkState: string, flash: string): void;
  // isConnected(): boolean;
  // isPhxView(el: HTMLElement): boolean;
  // isUnloaded(): boolean;
  // joinRootView(el: HTMLElement, href: string, flash: string, callback: (view: View, joinCount: number) => void): View;
  // joinRootViews(): boolean;
  // log(view: View, kind: string, msgCallback: () => [any, any]): void;
  // on(event: string, callback: (e: Event) => void): void;
  // onChannel(channel: Channel, event: string, cb: (data: any) => void): void;
  // owner(childEl: HTMLElement, callback: (view: View) => void): void;
  // pushHistoryPatch(href: string, linkState: any, targetEl: HTMLElement): void;
  // redirect(to: string, flash: string): void;
  // registerNewLocation(newLocation: Location): boolean;
  // reloadWithJitter(view: View): void;
  // replaceMain(href: string, flash: string, callback?: any, linkRef?: number): void;
  // replaceRootHistory(): void;
  // restorePreviouslyActiveFocus(): void;
  // setActiveElement(target: Element): void;
  // setPendingLink(href: string): number;
  // silenceEvents(callback: () => void): void;
  // time(name: string, func: () => any): any;
  // triggerDOM(kind: string, args: any): void;
  // withinOwners(childEl: HTMLElement, callback: (view: View, el: HTMLElement) => void): void;
  // withPageLoading(info: Event, callback: any): any;
  // wrapPush(view: View, opts: any, push: () => any): any;
}

export class Rendered {
  constructor(viewId: string, rendered: any);

  // public
  componentCIDs(diff: any): number[];
  componentToString(cid: number): string;
  doRecursiveMerge(target: any, source: any): void;
  getComponent(diff: any, cid: number): any;
  isComponentOnlyDiff(diff: any): boolean;
  mergeDiff(diff: any): void;
  parentViewId(): string;
  pruneCIDs(cids: number[]): any;
  recursiveMerge(target: object, source: object): void;
  recursiveToString(rendered: any, components: any, onlyCids?: number[]): string;
  toString(onlyCids?: number[]): string;

  // private
  // comprehensionToBuffer(rendered: any, output: any): void;
  // createSpan(text: string, cid: number): HTMLSpanElement;
  // dynamicToBuffer(rendered: any, output: any): void;
  // get(): any;
  // isNewFingerprint(diff: object): boolean;
  // recursiveCIDToString(components: any, cid: string, onlyCids?: number[]): any;
  // toOutputBuffer(rendered: any, output: object): any;
}

type Cid = number | string
type SelectorTarget = HTMLElement | SVGElement | Cid | string

type ViewHookEl = HTMLElement & {phxHookId: number}

export interface ViewHook {
  el: ViewHookEl;
  viewName: string;
  pushEvent(event: string, payload: object, onReply?: (reply: any, ref: number) => any): number | false;
  pushEventTo(selectorOrTarget: SelectorTarget, event: string, payload: object, onReply?: (reply: any, ref: number) => any): number | false;
  handleEvent(event: string, callback: (payload: object) => void): void;
  removeHandleEvent(callbackRef: any): void;
  upload(name: string, files: Array<Blob | string>): void;
  uploadTo(selectorOrTarget: SelectorTarget, name: string, files: Array<Blob | string>): void;


  // callbacks
  mounted?: (() => void) | undefined;
  beforeUpdate?: (() => void) | undefined;
  updated?: (() => void) | undefined;
  beforeDestroy?: (() => void) | undefined;
  destroyed?: (() => void) | undefined;
  disconnected?: (() => void) | undefined;
  reconnected?: (() => void) | undefined;
}

export class View {
  constructor(el: HTMLElement, liveSocket: LiveSocket, parentView: View, href: string, flash: string);

  // public?
  afterElementsRemoved(elements: Array<any>, pruneCids?: boolean): void;
  ackJoin(child: View): void;
  addHook(el: ViewHookEl | HTMLElement): void;
  applyDiff(type: string, rawDiff: any, callback: any): any;
  applyJoinPatch(live_patch: {kind: any, to: any} | null, html: string, events: Array<[string, object]>): void;
  applyPendingUpdates(): void;
  attachTrueDocEl(): void;
  bindChannel(): void;
  binding(kind: string): any;
  cancelSubmit(formEl: HTMLFormElement): void;
  closestComponentID(targetCtx: Cid | HTMLElement | null): number | null;
  componentID(el: HTMLElement): number | null;
  componentPatch(diff: any, cid: number): boolean;
  connectParams(liveReferer: any): object;
  destroy(callback?: () => void): void;
  destroyAllChildren(): void;
  destroyDescendent(id: string): any;
  destroyHook(hook: ViewHook): void;
  disableForm(formEl: HTMLFormElement): void;
  dispatchUploads(name: string, filesOrBlobs: Array<Blob | string>): void
  dispatchEvents(events: Array<[string, object]>): void;
  displayError(): void;
  dropPendingRefs(): void;
  extractMeta(el: HTMLElement, meta?: {}, value?: {}): void;
  execAll(binding: any): void;
  execNewMounted(): void;
  expandURL(to: string): string;
  extractMeta(el: HTMLElement, meta: object): object;
  formsForRecovery(html: string): HTMLFormElement[];
  getChildById(id: string): HTMLElement | null;
  getDescendentByEl(el: HTMLElement): HTMLElement | null;
  getHook(el: HTMLElement): ViewHook;
  getScheduledSubmit(formEl: HTMLElement): any;
  getSession(): any;
  getStatic(): string | null;
  hideLoader(): void;
  isConnected(): boolean;
  isDestroyed(): boolean;
  isJoinPending(): boolean;
  isLoading(): boolean;
  isMain(): boolean;
  joinDead(): boolean;
  join(callback?: (joinCount: number, onDone?: () => void) => void): void;
  joinChild(el: HTMLElement): any;
  joinNewChildren(): void;
  log(kind: string, msgCallback: any): void;
  maybeMounted(el: HTMLElement): void;
  maybeAddNewHook(el: HTMLElement, force?: any): void
  maybePushComponentsDestroyed(destroyedCIDs: number[]): any;
  name(): string;
  onAllChildJoinsComplete(): void;
  onChannel(event: string, cb: (resp: any) => void): void;
  onClose(reason: string): void;
  onError(reason: string): void;
  onJoin(resp: {rendered: any, container?: any}): void;
  onJoinComplete(resp: {live_patch: any}, html: string, events: Array<[string, object]>): void;
  onJoinError(resp: {reason: string, redirect?: any, live_redirect?: any}): void;
  onLivePatch(redir: object): void;
  onLiveRedirect(redir: object): void;
  onRedirect(redir: object): void;
  ownsElement(el: HTMLElement): boolean;
  performPatch(patch: any, pruneCids?: boolean): boolean;
  pushEvent(type: string, el: HTMLElement, targetCtx: HTMLElement | Cid | null, phxEvent: string, meta: object, opts?: {}): void;
  pushFileProgress(fileEl: HTMLElement, entryRef: string, progress: number, onReply?: () => void): void;
  pushFormRecovery(form: HTMLElement, callback: any): void;
  pushFormSubmit(formEl: HTMLFormElement, targetCtx: HTMLElement | Cid | null, phxEvent: string, opts: object, onReply: any): void;
  pushHookEvent(targetCtx: HTMLElement | Cid | null, event: string, payload: object, onReply: any): number | false;
  pushInput(inputEl: HTMLElement, targetCtx: HTMLElement | Cid | null, forceCid: any, phxEvent: string, opts: object, callback: any): void;
  pushKey(keyElement: HTMLElement, targetCtx: object | null, kind: string, phxEvent: string, meta: object): void;
  pushLinkPatch(href: string, targetEl: HTMLElement | null, callback: any): void;
  pushWithReply(refGenerator: any, event: string, payload: object, onReply?: () => void): any;
  putRef(elements: HTMLElement[], event: string, opts?: object): [number, HTMLElement[], object];
  renderContainer(diff: any, kind: string): string;
  scheduleSubmit(formEl: HTMLElement, ref: number, opts: object, callback: any): boolean;
  setHref(href: string): void;
  setContainerClasses(...classes: string[]): void;
  showLoader(timeout?: number): void;
  submitForm(form: HTMLFormElement, targetCtx: object | null, phxEvent: string): void;
  targetComponentID(target: HTMLElement, targetCtx?: HTMLElement | Cid | null, opts?: object): number | null;
  transition(time: number, onStart: () => {}, onDone?: () => {}): void;
  triggerAwaitingSubmit(formEl: HTMLElement): void;
  triggerBeforeUpdateHook(fromEl: HTMLElement, toEl: HTMLElement): any;
  triggerReconnected(): void;
  undoRefs(ref: number): void;
  update(diff: any, events: Array<[string, object]>): void;
  uploadFiles(formEl: HTMLFormElement, targetCtx: HTMLElement | Cid | null, ref: number, cid: number, onComplete: any): void;
  withinTargets(phxTarget: HTMLElement | SVGElement | Cid, callback: (view: View, phxTarget: HTMLElement | SVGElement) => {}): void;
}

export interface LiveViewFile extends File {
  _phxRef?: string | undefined;
}

export class UploadEntry<T> {
  constructor(fileEl: HTMLInputElement, file: LiveViewFile, view: View);

  fileEl: HTMLInputElement;
  file: LiveViewFile;
  view: View;
  meta: T | null;
  metadata: () => T | null;
  progress: (progress: number) => void;
  cancel: () => void;
  isDone: () => boolean;
  error: (reason?: string) => void;
}

export interface LiveViewUploaderMeta {
  path: string;
  ref: string;
  name: string;
  type: string;
  size: number;
  last_modified?: number | undefined;
}

export function debug(view: View, kind: string, msg: object, obj: object): void;

export namespace Browser {
  function canPushState(): boolean;
  function dropLocal(namespace: string, subkey: string): any;
  function fetchPage(href: string, callback: (status: number, resp?: string) => any): any;
  function getCookie(name: string): string;
  function getHashTargetEl(maybeHash: any): HTMLElement | null;
  function getLocal(namespace: string, subkey: string): any;
  function localKey(namespace: string, subkey: string): string;
  function pushState(kind: string, meta: object, to: string): void;
  function redirect(toURL: string, flash: string): void;
  function setCookie(name: string, value: string): void;
  function updateCurrentState(callback: any): void;
  function updateLocal(namespace: string, subkey: string, initial: any, func: (current: any) => any): any;
}

export namespace DOM {
  function all(node: Node, query: string, callback: (el: HTMLElement) => HTMLElement): HTMLElement[];
  function byId(id: string): HTMLElement | void;
  function childNodeLength(html: string): number;
  function cleanChildNodes(container: Node, phxUpdate: string): void;
  function cloneNode(node: Node, html: string): Node;
  function copyPrivates(target: HTMLElement, source: HTMLElement): void;
  function debounce(el: HTMLElement, event: Event, phxDebounce: string, defaultDebounce: string | null, phxThrottle: string, defaultThrottle: string | null, callback: () => any): any;
  function deletePrivate(el: HTMLElement, key: string): void;
  function discardError(container: Node, el: HTMLElement, phxFeedbackFor: string): void;
  function dispatchEvent(target: Node, eventString: string, detail?: object): void;
  function filterWithinSameLiveView(nodes: Node[], parent: any): any;
  function findComponentNode(node: Node, cid: number): HTMLElement[];
  function findParentCIDs(node: Node, cids: number[]): Set<number>;
  function findPhxChildren(el: HTMLElement, parentId: string): HTMLElement[];
  function findPhxChildrenInFragment(html: string, parentId: string): HTMLElement[];
  function findUploadInputs(node: Node): void | any[];
  function hasSelectionRange(el: HTMLElement): boolean;
  function incCycle(el: HTMLElement, key: string, trigger?: any): number;
  function isFormInput(el: HTMLElement): boolean;
  function isIgnored(el: HTMLElement, phxUpdate: string): boolean;
  function isNowTriggerFormExternal(el: HTMLElement, phxTriggerExternal: string): boolean;
  function isPhxChild(el: Node): boolean;
  function isPhxDestroyed(node: Node): boolean;
  function isPhxUpdate(el: Node, phxUpdate: string, updateTypes: string[]): boolean;
  function isTextualInput(el: HTMLElement): boolean;
  function isUploadInput(el: HTMLElement): boolean;
  function markPhxChildDestroyed(el: HTMLElement): void;
  function mergeAttrs(target: HTMLElement, source: HTMLElement, exclude?: string[]): void;
  function mergeFocusedInput(target: HTMLElement, source: HTMLElement): void;
  function once(el: HTMLElement, key: string): boolean;
  function private(el: HTMLElement, key: string): any;
  function putPrivate(el: HTMLElement, key: string, value: any): void;
  function putTitle(str: string): void;
  function removeClass(el: HTMLElement, className: string): void;
  function restoreFocus(focused: HTMLElement, selectionStart: number, selectionEnd: number): void;
  function showError(inputEl: HTMLElement, phxFeedbackFor: string): void;
  function syncAttrsToProps(el: HTMLElement): void;
  function syncPendingRef(fromEl: HTMLElement, toEl: HTMLElement, disableWith: string): boolean;
  function triggerCycle(el: HTMLElement, key: string, currentCycle?: number): void;
  function withinSameLiveView(node: Node, parent: Node): boolean;
}
