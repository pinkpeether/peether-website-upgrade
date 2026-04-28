import{n as c,c as P,a as M,r as B,i as U,o as j,b as u,d as Se,U as ge,e as Wi,f as Si,g as Ti}from"./index-DqnzOBz0.js";import{A as rn,i as q,e as Q,r as K,a as F,b as I,C as N,c as z,O as ie,d as A,E as oe,R as V,f as Ke,g as Y,h as k,S as bt,j as Bi,W as vt,k as an,l as In,T as sn,m as it,M as ci,n as ui,w as Ve,o as Pi}from"./core-Cg1X_wiN.js";import{g as Li}from"./index-q6AmN-oG.js";import"./index.es-STqAHLh8.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function di(r){return c({...r,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const we=r=>r??rn,Oi=q`
  :host {
    position: relative;
    background-color: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-size);
    height: var(--local-size);
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host > wui-flex {
    overflow: hidden;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host([name='Extension'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  :host([data-wallet-icon='allWallets']) {
    background-color: var(--wui-all-wallets-bg-100);
  }

  :host([data-wallet-icon='allWallets'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  wui-icon[data-parent-size='inherit'] {
    width: 75%;
    height: 75%;
    align-items: center;
  }

  wui-icon[data-parent-size='sm'] {
    width: 18px;
    height: 18px;
  }

  wui-icon[data-parent-size='md'] {
    width: 24px;
    height: 24px;
  }

  wui-icon[data-parent-size='lg'] {
    width: 42px;
    height: 42px;
  }

  wui-icon[data-parent-size='full'] {
    width: 100%;
    height: 100%;
  }

  :host > wui-icon-box {
    position: absolute;
    overflow: hidden;
    right: -1px;
    bottom: -2px;
    z-index: 1;
    border: 2px solid var(--wui-color-bg-150, #1e1f1f);
    padding: 1px;
  }
`;var Te=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let me=class extends F{constructor(){super(...arguments),this.size="md",this.name="",this.installed=!1,this.badgeSize="xs"}render(){let e="xxs";return this.size==="lg"?e="m":this.size==="md"?e="xs":e="xxs",this.style.cssText=`
       --local-border-radius: var(--wui-border-radius-${e});
       --local-size: var(--wui-wallet-image-size-${this.size});
   `,this.walletIcon&&(this.dataset.walletIcon=this.walletIcon),I`
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `}templateVisual(){return this.imageSrc?I`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:this.walletIcon?I`<wui-icon
        data-parent-size="md"
        size="md"
        color="inherit"
        name=${this.walletIcon}
      ></wui-icon>`:I`<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`}};me.styles=[Q,K,Oi];Te([c()],me.prototype,"size",void 0);Te([c()],me.prototype,"name",void 0);Te([c()],me.prototype,"imageSrc",void 0);Te([c()],me.prototype,"walletIcon",void 0);Te([c({type:Boolean})],me.prototype,"installed",void 0);Te([c()],me.prototype,"badgeSize",void 0);me=Te([P("wui-wallet-image")],me);const Ai=q`
  :host {
    position: relative;
    border-radius: var(--wui-border-radius-xxs);
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--wui-spacing-4xs);
    padding: 3.75px !important;
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host > wui-wallet-image {
    width: 14px;
    height: 14px;
    border-radius: var(--wui-border-radius-5xs);
  }

  :host > wui-flex {
    padding: 2px;
    position: fixed;
    overflow: hidden;
    left: 34px;
    bottom: 8px;
    background: var(--dark-background-150, #1e1f1f);
    border-radius: 50%;
    z-index: 2;
    display: flex;
  }
`;var hi=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};const Bt=4;let ot=class extends F{constructor(){super(...arguments),this.walletImages=[]}render(){const e=this.walletImages.length<Bt;return I`${this.walletImages.slice(0,Bt).map(({src:n,walletName:i})=>I`
            <wui-wallet-image
              size="inherit"
              imageSrc=${n}
              name=${we(i)}
            ></wui-wallet-image>
          `)}
      ${e?[...Array(Bt-this.walletImages.length)].map(()=>I` <wui-wallet-image size="inherit" name=""></wui-wallet-image>`):null}
      <wui-flex>
        <wui-icon-box
          size="xxs"
          iconSize="xxs"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>`}};ot.styles=[K,Ai];hi([c({type:Array})],ot.prototype,"walletImages",void 0);ot=hi([P("wui-all-wallets-image")],ot);const ji=q`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }

  wui-icon {
    color: var(--wui-color-fg-200) !important;
  }
`;var X=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let H=class extends F{constructor(){super(...arguments),this.walletImages=[],this.imageSrc="",this.name="",this.tabIdx=void 0,this.installed=!1,this.disabled=!1,this.showAllWallets=!1,this.loading=!1,this.loadingSpinnerColor="accent-100"}render(){return I`
      <button ?disabled=${this.disabled} tabindex=${we(this.tabIdx)}>
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text>
        ${this.templateStatus()}
      </button>
    `}templateAllWallets(){return this.showAllWallets&&this.imageSrc?I` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `:this.showAllWallets&&this.walletIcon?I` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `:null}templateWalletImage(){return!this.showAllWallets&&this.imageSrc?I`<wui-wallet-image
        size="sm"
        imageSrc=${this.imageSrc}
        name=${this.name}
        .installed=${this.installed}
      ></wui-wallet-image>`:!this.showAllWallets&&!this.imageSrc?I`<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`:null}templateStatus(){return this.loading?I`<wui-loading-spinner
        size="lg"
        color=${this.loadingSpinnerColor}
      ></wui-loading-spinner>`:this.tagLabel&&this.tagVariant?I`<wui-tag variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`:this.icon?I`<wui-icon color="inherit" size="sm" name=${this.icon}></wui-icon>`:null}};H.styles=[K,Q,ji];X([c({type:Array})],H.prototype,"walletImages",void 0);X([c()],H.prototype,"imageSrc",void 0);X([c()],H.prototype,"name",void 0);X([c()],H.prototype,"tagLabel",void 0);X([c()],H.prototype,"tagVariant",void 0);X([c()],H.prototype,"icon",void 0);X([c()],H.prototype,"walletIcon",void 0);X([c()],H.prototype,"tabIdx",void 0);X([c({type:Boolean})],H.prototype,"installed",void 0);X([c({type:Boolean})],H.prototype,"disabled",void 0);X([c({type:Boolean})],H.prototype,"showAllWallets",void 0);X([c({type:Boolean})],H.prototype,"loading",void 0);X([c({type:String})],H.prototype,"loadingSpinnerColor",void 0);H=X([P("wui-list-wallet")],H);var Ne=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let $e=class extends U{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=N.state.connectors,this.count=z.state.count,this.filteredCount=z.state.filteredWallets.length,this.isFetchingRecommendedWallets=z.state.isFetchingRecommendedWallets,this.unsubscribe.push(N.subscribeKey("connectors",e=>this.connectors=e),z.subscribeKey("count",e=>this.count=e),z.subscribeKey("filteredWallets",e=>this.filteredCount=e.length),z.subscribeKey("isFetchingRecommendedWallets",e=>this.isFetchingRecommendedWallets=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.connectors.find(l=>l.id==="walletConnect"),{allWallets:n}=ie.state;if(!e||n==="HIDE"||n==="ONLY_MOBILE"&&!A.isMobile())return null;const i=z.state.featured.length,o=this.count+i,t=o<10?o:Math.floor(o/10)*10,a=this.filteredCount>0?this.filteredCount:t;let s=`${a}`;return this.filteredCount>0?s=`${this.filteredCount}`:a<o&&(s=`${a}+`),u`
      <wui-list-wallet
        name="All Wallets"
        walletIcon="allWallets"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${s}
        tagVariant="shade"
        data-testid="all-wallets"
        tabIdx=${j(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        loadingSpinnerColor=${this.isFetchingRecommendedWallets?"fg-300":"accent-100"}
      ></wui-list-wallet>
    `}onAllWallets(){oe.sendEvent({type:"track",event:"CLICK_ALL_WALLETS"}),V.push("AllWallets")}};Ne([M()],$e.prototype,"tabIdx",void 0);Ne([B()],$e.prototype,"connectors",void 0);Ne([B()],$e.prototype,"count",void 0);Ne([B()],$e.prototype,"filteredCount",void 0);Ne([B()],$e.prototype,"isFetchingRecommendedWallets",void 0);$e=Ne([P("w3m-all-wallets-widget")],$e);var fn=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let rt=class extends U{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=N.state.connectors,this.unsubscribe.push(N.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.connectors.filter(n=>n.type==="ANNOUNCED");return e?.length?u`
      <wui-flex flexDirection="column" gap="xs">
        ${e.filter(Ke.showConnector).map(n=>u`
              <wui-list-wallet
                imageSrc=${j(Y.getConnectorImage(n))}
                name=${n.name??"Unknown"}
                @click=${()=>this.onConnector(n)}
                tagVariant="success"
                tagLabel="installed"
                data-testid=${`wallet-selector-${n.id}`}
                .installed=${!0}
                tabIdx=${j(this.tabIdx)}
              >
              </wui-list-wallet>
            `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){e.id==="walletConnect"?A.isMobile()?V.push("AllWallets"):V.push("ConnectingWalletConnect"):V.push("ConnectingExternal",{connector:e})}};fn([M()],rt.prototype,"tabIdx",void 0);fn([B()],rt.prototype,"connectors",void 0);rt=fn([P("w3m-connect-announced-widget")],rt);var yt=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let He=class extends U{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=N.state.connectors,this.loading=!1,this.unsubscribe.push(N.subscribeKey("connectors",e=>this.connectors=e)),A.isTelegram()&&A.isIos()&&(this.loading=!k.state.wcUri,this.unsubscribe.push(k.subscribeKey("wcUri",e=>this.loading=!e)))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const{customWallets:e}=ie.state;if(!e?.length)return this.style.cssText="display: none",null;const n=this.filterOutDuplicateWallets(e);return u`<wui-flex flexDirection="column" gap="xs">
      ${n.map(i=>u`
          <wui-list-wallet
            imageSrc=${j(Y.getWalletImage(i))}
            name=${i.name??"Unknown"}
            @click=${()=>this.onConnectWallet(i)}
            data-testid=${`wallet-selector-${i.id}`}
            tabIdx=${j(this.tabIdx)}
            ?loading=${this.loading}
          >
          </wui-list-wallet>
        `)}
    </wui-flex>`}filterOutDuplicateWallets(e){const n=bt.getRecentWallets(),i=this.connectors.map(s=>s.info?.rdns).filter(Boolean),o=n.map(s=>s.rdns).filter(Boolean),t=i.concat(o);if(t.includes("io.metamask.mobile")&&A.isMobile()){const s=t.indexOf("io.metamask.mobile");t[s]="io.metamask"}return e.filter(s=>!t.includes(String(s?.rdns)))}onConnectWallet(e){this.loading||V.push("ConnectingWalletConnect",{wallet:e})}};yt([M()],He.prototype,"tabIdx",void 0);yt([B()],He.prototype,"connectors",void 0);yt([B()],He.prototype,"loading",void 0);He=yt([P("w3m-connect-custom-widget")],He);var pn=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let at=class extends U{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=N.state.connectors,this.unsubscribe.push(N.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const i=this.connectors.filter(o=>o.type==="EXTERNAL").filter(Ke.showConnector).filter(o=>o.id!==Bi.CONNECTOR_ID.COINBASE_SDK);return i?.length?u`
      <wui-flex flexDirection="column" gap="xs">
        ${i.map(o=>u`
            <wui-list-wallet
              imageSrc=${j(Y.getConnectorImage(o))}
              .installed=${!0}
              name=${o.name??"Unknown"}
              data-testid=${`wallet-selector-external-${o.id}`}
              @click=${()=>this.onConnector(o)}
              tabIdx=${j(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){V.push("ConnectingExternal",{connector:e})}};pn([M()],at.prototype,"tabIdx",void 0);pn([B()],at.prototype,"connectors",void 0);at=pn([P("w3m-connect-external-widget")],at);var gn=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let st=class extends U{constructor(){super(...arguments),this.tabIdx=void 0,this.wallets=[]}render(){return this.wallets.length?u`
      <wui-flex flexDirection="column" gap="xs">
        ${this.wallets.map(e=>u`
            <wui-list-wallet
              data-testid=${`wallet-selector-featured-${e.id}`}
              imageSrc=${j(Y.getWalletImage(e))}
              name=${e.name??"Unknown"}
              @click=${()=>this.onConnectWallet(e)}
              tabIdx=${j(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(e){N.selectWalletConnector(e)}};gn([M()],st.prototype,"tabIdx",void 0);gn([M()],st.prototype,"wallets",void 0);st=gn([P("w3m-connect-featured-widget")],st);var wn=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let lt=class extends U{constructor(){super(...arguments),this.tabIdx=void 0,this.connectors=[]}render(){const e=this.connectors.filter(Ke.showConnector);return e.length===0?(this.style.cssText="display: none",null):u`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map(n=>u`
            <wui-list-wallet
              imageSrc=${j(Y.getConnectorImage(n))}
              .installed=${!0}
              name=${n.name??"Unknown"}
              tagVariant="success"
              tagLabel="installed"
              data-testid=${`wallet-selector-${n.id}`}
              @click=${()=>this.onConnector(n)}
              tabIdx=${j(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `}onConnector(e){N.setActiveConnector(e),V.push("ConnectingExternal",{connector:e})}};wn([M()],lt.prototype,"tabIdx",void 0);wn([M()],lt.prototype,"connectors",void 0);lt=wn([P("w3m-connect-injected-widget")],lt);var mn=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let ct=class extends U{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=N.state.connectors,this.unsubscribe.push(N.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.connectors.filter(n=>n.type==="MULTI_CHAIN"&&n.name!=="WalletConnect");return e?.length?u`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map(n=>u`
            <wui-list-wallet
              imageSrc=${j(Y.getConnectorImage(n))}
              .installed=${!0}
              name=${n.name??"Unknown"}
              tagVariant="shade"
              tagLabel="multichain"
              data-testid=${`wallet-selector-${n.id}`}
              @click=${()=>this.onConnector(n)}
              tabIdx=${j(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){N.setActiveConnector(e),V.push("ConnectingMultiChain")}};mn([M()],ct.prototype,"tabIdx",void 0);mn([B()],ct.prototype,"connectors",void 0);ct=mn([P("w3m-connect-multi-chain-widget")],ct);var xt=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let Ge=class extends U{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=N.state.connectors,this.loading=!1,this.unsubscribe.push(N.subscribeKey("connectors",e=>this.connectors=e)),A.isTelegram()&&A.isIos()&&(this.loading=!k.state.wcUri,this.unsubscribe.push(k.subscribeKey("wcUri",e=>this.loading=!e)))}render(){const n=bt.getRecentWallets().filter(i=>!vt.isExcluded(i)).filter(i=>!this.hasWalletConnector(i)).filter(i=>this.isWalletCompatibleWithCurrentChain(i));return n.length?u`
      <wui-flex flexDirection="column" gap="xs">
        ${n.map(i=>u`
            <wui-list-wallet
              imageSrc=${j(Y.getWalletImage(i))}
              name=${i.name??"Unknown"}
              @click=${()=>this.onConnectWallet(i)}
              tagLabel="recent"
              tagVariant="shade"
              tabIdx=${j(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(e){this.loading||N.selectWalletConnector(e)}hasWalletConnector(e){return this.connectors.some(n=>n.id===e.id||n.name===e.name)}isWalletCompatibleWithCurrentChain(e){const n=an.state.activeChain;return n&&e.chains?e.chains.some(i=>{const o=i.split(":")[0];return n===o}):!0}};xt([M()],Ge.prototype,"tabIdx",void 0);xt([B()],Ge.prototype,"connectors",void 0);xt([B()],Ge.prototype,"loading",void 0);Ge=xt([P("w3m-connect-recent-widget")],Ge);var Ct=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let Ye=class extends U{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.wallets=[],this.loading=!1,A.isTelegram()&&A.isIos()&&(this.loading=!k.state.wcUri,this.unsubscribe.push(k.subscribeKey("wcUri",e=>this.loading=!e)))}render(){const{connectors:e}=N.state,{customWallets:n,featuredWalletIds:i}=ie.state,o=bt.getRecentWallets(),t=e.find(w=>w.id==="walletConnect"),s=e.filter(w=>w.type==="INJECTED"||w.type==="ANNOUNCED"||w.type==="MULTI_CHAIN").filter(w=>w.name!=="Browser Wallet");if(!t)return null;if(i||n||!this.wallets.length)return this.style.cssText="display: none",null;const l=s.length+o.length,d=Math.max(0,2-l),h=vt.filterOutDuplicateWallets(this.wallets).slice(0,d);return h.length?u`
      <wui-flex flexDirection="column" gap="xs">
        ${h.map(w=>u`
            <wui-list-wallet
              imageSrc=${j(Y.getWalletImage(w))}
              name=${w?.name??"Unknown"}
              @click=${()=>this.onConnectWallet(w)}
              tabIdx=${j(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(e){if(this.loading)return;const n=N.getConnector(e.id,e.rdns);n?V.push("ConnectingExternal",{connector:n}):V.push("ConnectingWalletConnect",{wallet:e})}};Ct([M()],Ye.prototype,"tabIdx",void 0);Ct([M()],Ye.prototype,"wallets",void 0);Ct([B()],Ye.prototype,"loading",void 0);Ye=Ct([P("w3m-connect-recommended-widget")],Ye);var Rt=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let Je=class extends U{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=N.state.connectors,this.connectorImages=In.state.connectorImages,this.unsubscribe.push(N.subscribeKey("connectors",e=>this.connectors=e),In.subscribeKey("connectorImages",e=>this.connectorImages=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(A.isMobile())return this.style.cssText="display: none",null;const e=this.connectors.find(i=>i.id==="walletConnect");if(!e)return this.style.cssText="display: none",null;const n=e.imageUrl||this.connectorImages[e?.imageId??""];return u`
      <wui-list-wallet
        imageSrc=${j(n)}
        name=${e.name??"Unknown"}
        @click=${()=>this.onConnector(e)}
        tagLabel="qr code"
        tagVariant="main"
        tabIdx=${j(this.tabIdx)}
        data-testid="wallet-selector-walletconnect"
      >
      </wui-list-wallet>
    `}onConnector(e){N.setActiveConnector(e),V.push("ConnectingWalletConnect")}};Rt([M()],Je.prototype,"tabIdx",void 0);Rt([B()],Je.prototype,"connectors",void 0);Rt([B()],Je.prototype,"connectorImages",void 0);Je=Rt([P("w3m-connect-walletconnect-widget")],Je);const ki=Se`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`;var Qe=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let _e=class extends U{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=N.state.connectors,this.recommended=z.state.recommended,this.featured=z.state.featured,this.unsubscribe.push(N.subscribeKey("connectors",e=>this.connectors=e),z.subscribeKey("recommended",e=>this.recommended=e),z.subscribeKey("featured",e=>this.featured=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return u`
      <wui-flex flexDirection="column" gap="xs"> ${this.connectorListTemplate()} </wui-flex>
    `}connectorListTemplate(){const{custom:e,recent:n,announced:i,injected:o,multiChain:t,recommended:a,featured:s,external:l}=Ke.getConnectorsByType(this.connectors,this.recommended,this.featured);return Ke.getConnectorTypeOrder({custom:e,recent:n,announced:i,injected:o,multiChain:t,recommended:a,featured:s,external:l}).map(h=>{switch(h){case"injected":return u`
            ${t.length?u`<w3m-connect-multi-chain-widget
                  tabIdx=${j(this.tabIdx)}
                ></w3m-connect-multi-chain-widget>`:null}
            ${i.length?u`<w3m-connect-announced-widget
                  tabIdx=${j(this.tabIdx)}
                ></w3m-connect-announced-widget>`:null}
            ${o.length?u`<w3m-connect-injected-widget
                  .connectors=${o}
                  tabIdx=${j(this.tabIdx)}
                ></w3m-connect-injected-widget>`:null}
          `;case"walletConnect":return u`<w3m-connect-walletconnect-widget
            tabIdx=${j(this.tabIdx)}
          ></w3m-connect-walletconnect-widget>`;case"recent":return u`<w3m-connect-recent-widget
            tabIdx=${j(this.tabIdx)}
          ></w3m-connect-recent-widget>`;case"featured":return u`<w3m-connect-featured-widget
            .wallets=${s}
            tabIdx=${j(this.tabIdx)}
          ></w3m-connect-featured-widget>`;case"custom":return u`<w3m-connect-custom-widget
            tabIdx=${j(this.tabIdx)}
          ></w3m-connect-custom-widget>`;case"external":return u`<w3m-connect-external-widget
            tabIdx=${j(this.tabIdx)}
          ></w3m-connect-external-widget>`;case"recommended":return u`<w3m-connect-recommended-widget
            .wallets=${a}
            tabIdx=${j(this.tabIdx)}
          ></w3m-connect-recommended-widget>`;default:return console.warn(`Unknown connector type: ${h}`),null}})}};_e.styles=ki;Qe([M()],_e.prototype,"tabIdx",void 0);Qe([B()],_e.prototype,"connectors",void 0);Qe([B()],_e.prototype,"recommended",void 0);Qe([B()],_e.prototype,"featured",void 0);_e=Qe([P("w3m-connector-list")],_e);const Di=q`
  :host {
    display: inline-flex;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    padding: var(--wui-spacing-3xs);
    position: relative;
    height: 36px;
    min-height: 36px;
    overflow: hidden;
  }

  :host::before {
    content: '';
    position: absolute;
    pointer-events: none;
    top: 4px;
    left: 4px;
    display: block;
    width: var(--local-tab-width);
    height: 28px;
    border-radius: var(--wui-border-radius-3xl);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transform: translateX(calc(var(--local-tab) * var(--local-tab-width)));
    transition: transform var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color, opacity;
  }

  :host([data-type='flex'])::before {
    left: 3px;
    transform: translateX(calc((var(--local-tab) * 34px) + (var(--local-tab) * 4px)));
  }

  :host([data-type='flex']) {
    display: flex;
    padding: 0px 0px 0px 12px;
    gap: 4px;
  }

  :host([data-type='flex']) > button > wui-text {
    position: absolute;
    left: 18px;
    opacity: 0;
  }

  button[data-active='true'] > wui-icon,
  button[data-active='true'] > wui-text {
    color: var(--wui-color-fg-100);
  }

  button[data-active='false'] > wui-icon,
  button[data-active='false'] > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='true']:disabled,
  button[data-active='false']:disabled {
    background-color: transparent;
    opacity: 0.5;
    cursor: not-allowed;
  }

  button[data-active='true']:disabled > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='false']:disabled > wui-text {
    color: var(--wui-color-fg-300);
  }

  button > wui-icon,
  button > wui-text {
    pointer-events: none;
    transition: color var(--wui-e ase-out-power-1) var(--wui-duration-md);
    will-change: color;
  }

  button {
    width: var(--local-tab-width);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  :host([data-type='flex']) > button {
    width: 34px;
    position: relative;
    display: flex;
    justify-content: flex-start;
  }

  button:hover:enabled,
  button:active:enabled {
    background-color: transparent !important;
  }

  button:hover:enabled > wui-icon,
  button:active:enabled > wui-icon {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button:hover:enabled > wui-text,
  button:active:enabled > wui-text {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
  }
`;var Re=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let le=class extends F{constructor(){super(...arguments),this.tabs=[],this.onTabChange=()=>null,this.buttons=[],this.disabled=!1,this.localTabWidth="100px",this.activeTab=0,this.isDense=!1}render(){return this.isDense=this.tabs.length>3,this.style.cssText=`
      --local-tab: ${this.activeTab};
      --local-tab-width: ${this.localTabWidth};
    `,this.dataset.type=this.isDense?"flex":"block",this.tabs.map((e,n)=>{const i=n===this.activeTab;return I`
        <button
          ?disabled=${this.disabled}
          @click=${()=>this.onTabClick(n)}
          data-active=${i}
          data-testid="tab-${e.label?.toLowerCase()}"
        >
          ${this.iconTemplate(e)}
          <wui-text variant="small-600" color="inherit"> ${e.label} </wui-text>
        </button>
      `})}firstUpdated(){this.shadowRoot&&this.isDense&&(this.buttons=[...this.shadowRoot.querySelectorAll("button")],setTimeout(()=>{this.animateTabs(0,!0)},0))}iconTemplate(e){return e.icon?I`<wui-icon size="xs" color="inherit" name=${e.icon}></wui-icon>`:null}onTabClick(e){this.buttons&&this.animateTabs(e,!1),this.activeTab=e,this.onTabChange(e)}animateTabs(e,n){const i=this.buttons[this.activeTab],o=this.buttons[e],t=i?.querySelector("wui-text"),a=o?.querySelector("wui-text"),s=o?.getBoundingClientRect(),l=a?.getBoundingClientRect();i&&t&&!n&&e!==this.activeTab&&(t.animate([{opacity:0}],{duration:50,easing:"ease",fill:"forwards"}),i.animate([{width:"34px"}],{duration:500,easing:"ease",fill:"forwards"})),o&&s&&l&&a&&(e!==this.activeTab||n)&&(this.localTabWidth=`${Math.round(s.width+l.width)+6}px`,o.animate([{width:`${s.width+l.width}px`}],{duration:n?0:500,fill:"forwards",easing:"ease"}),a.animate([{opacity:1}],{duration:n?0:125,delay:n?0:200,fill:"forwards",easing:"ease"}))}};le.styles=[K,Q,Di];Re([c({type:Array})],le.prototype,"tabs",void 0);Re([c()],le.prototype,"onTabChange",void 0);Re([c({type:Array})],le.prototype,"buttons",void 0);Re([c({type:Boolean})],le.prototype,"disabled",void 0);Re([c()],le.prototype,"localTabWidth",void 0);Re([di()],le.prototype,"activeTab",void 0);Re([di()],le.prototype,"isDense",void 0);le=Re([P("wui-tabs")],le);var bn=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let ut=class extends U{constructor(){super(...arguments),this.platformTabs=[],this.unsubscribe=[],this.platforms=[],this.onSelectPlatfrom=void 0}disconnectCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.generateTabs();return u`
      <wui-flex justifyContent="center" .padding=${["0","0","l","0"]}>
        <wui-tabs .tabs=${e} .onTabChange=${this.onTabChange.bind(this)}></wui-tabs>
      </wui-flex>
    `}generateTabs(){const e=this.platforms.map(n=>n==="browser"?{label:"Browser",icon:"extension",platform:"browser"}:n==="mobile"?{label:"Mobile",icon:"mobile",platform:"mobile"}:n==="qrcode"?{label:"Mobile",icon:"mobile",platform:"qrcode"}:n==="web"?{label:"Webapp",icon:"browser",platform:"web"}:n==="desktop"?{label:"Desktop",icon:"desktop",platform:"desktop"}:{label:"Browser",icon:"extension",platform:"unsupported"});return this.platformTabs=e.map(({platform:n})=>n),e}onTabChange(e){const n=this.platformTabs[e];n&&this.onSelectPlatfrom?.(n)}};bn([M({type:Array})],ut.prototype,"platforms",void 0);bn([M()],ut.prototype,"onSelectPlatfrom",void 0);ut=bn([P("w3m-connecting-header")],ut);const zi=q`
  :host {
    width: var(--local-width);
    position: relative;
  }

  button {
    border: none;
    border-radius: var(--local-border-radius);
    width: var(--local-width);
    white-space: nowrap;
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='md'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-l);
    height: 36px;
  }

  button[data-size='md'][data-icon-left='true'][data-icon-right='false'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-s);
  }

  button[data-size='md'][data-icon-right='true'][data-icon-left='false'] {
    padding: 8.2px var(--wui-spacing-s) 9px var(--wui-spacing-l);
  }

  button[data-size='lg'] {
    padding: var(--wui-spacing-m) var(--wui-spacing-2l);
    height: 48px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='inverse'] {
    background-color: var(--wui-color-inverse-100);
    color: var(--wui-color-inverse-000);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='accent-error'] {
    background: var(--wui-color-error-glass-015);
    color: var(--wui-color-error-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-error-glass-010);
  }

  button[data-variant='accent-success'] {
    background: var(--wui-color-success-glass-015);
    color: var(--wui-color-success-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-success-glass-010);
  }

  button[data-variant='neutral'] {
    background: transparent;
    color: var(--wui-color-fg-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  /* -- Focus states --------------------------------------------------- */
  button[data-variant='main']:focus-visible:enabled {
    background-color: var(--wui-color-accent-090);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='inverse']:focus-visible:enabled {
    background-color: var(--wui-color-inverse-100);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent']:focus-visible:enabled {
    background-color: var(--wui-color-accent-glass-010);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent-error']:focus-visible:enabled {
    background: var(--wui-color-error-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-error-100),
      0 0 0 4px var(--wui-color-error-glass-020);
  }
  button[data-variant='accent-success']:focus-visible:enabled {
    background: var(--wui-color-success-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-success-100),
      0 0 0 4px var(--wui-color-success-glass-020);
  }
  button[data-variant='neutral']:focus-visible:enabled {
    background: var(--wui-color-gray-glass-005);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-gray-glass-002);
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:active:enabled {
      background-color: var(--wui-color-accent-080);
    }

    button[data-variant='accent']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button[data-variant='accent']:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }

    button[data-variant='accent-error']:hover:enabled {
      background: var(--wui-color-error-glass-020);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-error']:active:enabled {
      background: var(--wui-color-error-glass-030);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-success']:hover:enabled {
      background: var(--wui-color-success-glass-020);
      color: var(--wui-color-success-100);
    }

    button[data-variant='accent-success']:active:enabled {
      background: var(--wui-color-success-glass-030);
      color: var(--wui-color-success-100);
    }

    button[data-variant='neutral']:hover:enabled {
      background: var(--wui-color-gray-glass-002);
    }

    button[data-variant='neutral']:active:enabled {
      background: var(--wui-color-gray-glass-005);
    }

    button[data-size='lg'][data-icon-left='true'][data-icon-right='false'] {
      padding-left: var(--wui-spacing-m);
    }

    button[data-size='lg'][data-icon-right='true'][data-icon-left='false'] {
      padding-right: var(--wui-spacing-m);
    }
  }

  /* -- Disabled state --------------------------------------------------- */
  button:disabled {
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    color: var(--wui-color-gray-glass-020);
    cursor: not-allowed;
  }

  button > wui-text {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  ::slotted(*) {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  wui-loading-spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: var(--local-opacity-000);
  }
`;var ce=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};const En={main:"inverse-100",inverse:"inverse-000",accent:"accent-100","accent-error":"error-100","accent-success":"success-100",neutral:"fg-100",disabled:"gray-glass-020"},Ni={lg:"paragraph-600",md:"small-600"},Mi={lg:"md",md:"md"};let ee=class extends F{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="main",this.hasIconLeft=!1,this.hasIconRight=!1,this.borderRadius="m"}render(){this.style.cssText=`
    --local-width: ${this.fullWidth?"100%":"auto"};
    --local-opacity-100: ${this.loading?0:1};
    --local-opacity-000: ${this.loading?1:0};
    --local-border-radius: var(--wui-border-radius-${this.borderRadius});
    `;const e=this.textVariant??Ni[this.size];return I`
      <button
        data-variant=${this.variant}
        data-icon-left=${this.hasIconLeft}
        data-icon-right=${this.hasIconRight}
        data-size=${this.size}
        ?disabled=${this.disabled}
      >
        ${this.loadingTemplate()}
        <slot name="iconLeft" @slotchange=${()=>this.handleSlotLeftChange()}></slot>
        <wui-text variant=${e} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight" @slotchange=${()=>this.handleSlotRightChange()}></slot>
      </button>
    `}handleSlotLeftChange(){this.hasIconLeft=!0}handleSlotRightChange(){this.hasIconRight=!0}loadingTemplate(){if(this.loading){const e=Mi[this.size],n=this.disabled?En.disabled:En[this.variant];return I`<wui-loading-spinner color=${n} size=${e}></wui-loading-spinner>`}return I``}};ee.styles=[K,Q,zi];ce([c()],ee.prototype,"size",void 0);ce([c({type:Boolean})],ee.prototype,"disabled",void 0);ce([c({type:Boolean})],ee.prototype,"fullWidth",void 0);ce([c({type:Boolean})],ee.prototype,"loading",void 0);ce([c()],ee.prototype,"variant",void 0);ce([c({type:Boolean})],ee.prototype,"hasIconLeft",void 0);ce([c({type:Boolean})],ee.prototype,"hasIconRight",void 0);ce([c()],ee.prototype,"borderRadius",void 0);ce([c()],ee.prototype,"textVariant",void 0);ee=ce([P("wui-button")],ee);const Ui=q`
  button {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
    border-radius: var(--wui-border-radius-3xs);
    background-color: transparent;
    color: var(--wui-color-accent-100);
  }

  button:disabled {
    background-color: transparent;
    color: var(--wui-color-gray-glass-015);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }
`;var $t=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let je=class extends F{constructor(){super(...arguments),this.tabIdx=void 0,this.disabled=!1,this.color="inherit"}render(){return I`
      <button ?disabled=${this.disabled} tabindex=${we(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}};je.styles=[K,Q,Ui];$t([c()],je.prototype,"tabIdx",void 0);$t([c({type:Boolean})],je.prototype,"disabled",void 0);$t([c()],je.prototype,"color",void 0);je=$t([P("wui-link")],je);const qi=q`
  :host {
    display: block;
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  svg {
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  rect {
    fill: none;
    stroke: var(--wui-color-accent-100);
    stroke-width: 4px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;var fi=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let dt=class extends F{constructor(){super(...arguments),this.radius=36}render(){return this.svgLoaderTemplate()}svgLoaderTemplate(){const e=this.radius>50?50:this.radius,i=36-e,o=116+i,t=245+i,a=360+i*1.75;return I`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${e}
          stroke-dasharray="${o} ${t}"
          stroke-dashoffset=${a}
        />
      </svg>
    `}};dt.styles=[K,qi];fi([c({type:Number})],dt.prototype,"radius",void 0);dt=fi([P("wui-loading-thumbnail")],dt);const Fi=q`
  button {
    border: none;
    border-radius: var(--wui-border-radius-3xl);
  }

  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='gray'] {
    background-color: transparent;
    color: var(--wui-color-fg-200);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='shade'] {
    background-color: transparent;
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-size='sm'] {
    height: 32px;
    padding: 0 var(--wui-spacing-s);
  }

  button[data-size='md'] {
    height: 40px;
    padding: 0 var(--wui-spacing-l);
  }

  button[data-size='sm'] > wui-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='md'] > wui-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='sm'] > wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] > wui-icon {
    width: 14px;
    height: 14px;
  }

  wui-image {
    border-radius: var(--wui-border-radius-3xl);
    overflow: hidden;
  }

  button.disabled > wui-icon,
  button.disabled > wui-image {
    filter: grayscale(1);
  }

  button[data-variant='main'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-accent-090);
  }

  button[data-variant='shade'] > wui-image,
  button[data-variant='gray'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:focus-visible {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:active:enabled {
      background-color: var(--wui-color-accent-080);
    }

    button[data-variant='accent']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button[data-variant='accent']:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }

    button[data-variant='shade']:focus-visible,
    button[data-variant='gray']:focus-visible,
    button[data-variant='shade']:hover,
    button[data-variant='gray']:hover {
      background-color: var(--wui-color-gray-glass-002);
    }

    button[data-variant='gray']:active,
    button[data-variant='shade']:active {
      background-color: var(--wui-color-gray-glass-005);
    }
  }

  button.disabled {
    color: var(--wui-color-gray-glass-020);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    pointer-events: none;
  }
`;var Be=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let be=class extends F{constructor(){super(...arguments),this.variant="accent",this.imageSrc="",this.disabled=!1,this.icon="externalLink",this.size="md",this.text=""}render(){const e=this.size==="sm"?"small-600":"paragraph-600";return I`
      <button
        class=${this.disabled?"disabled":""}
        data-variant=${this.variant}
        data-size=${this.size}
      >
        ${this.imageSrc?I`<wui-image src=${this.imageSrc}></wui-image>`:null}
        <wui-text variant=${e} color="inherit"> ${this.text} </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </button>
    `}};be.styles=[K,Q,Fi];Be([c()],be.prototype,"variant",void 0);Be([c()],be.prototype,"imageSrc",void 0);Be([c({type:Boolean})],be.prototype,"disabled",void 0);Be([c()],be.prototype,"icon",void 0);Be([c()],be.prototype,"size",void 0);Be([c()],be.prototype,"text",void 0);be=Be([P("wui-chip-button")],be);const Vi=q`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`;var _t=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let ke=class extends F{constructor(){super(...arguments),this.disabled=!1,this.label="",this.buttonLabel=""}render(){return I`
      <wui-flex
        justifyContent="space-between"
        alignItems="center"
        .padding=${["1xs","2l","1xs","2l"]}
      >
        <wui-text variant="paragraph-500" color="fg-200">${this.label}</wui-text>
        <wui-chip-button size="sm" variant="shade" text=${this.buttonLabel} icon="chevronRight">
        </wui-chip-button>
      </wui-flex>
    `}};ke.styles=[K,Q,Vi];_t([c({type:Boolean})],ke.prototype,"disabled",void 0);_t([c()],ke.prototype,"label",void 0);_t([c()],ke.prototype,"buttonLabel",void 0);ke=_t([P("wui-cta-button")],ke);const Ki=Se`
  :host {
    display: block;
    padding: 0 var(--wui-spacing-xl) var(--wui-spacing-xl);
  }
`;var pi=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let ht=class extends U{constructor(){super(...arguments),this.wallet=void 0}render(){if(!this.wallet)return this.style.display="none",null;const{name:e,app_store:n,play_store:i,chrome_store:o,homepage:t}=this.wallet,a=A.isMobile(),s=A.isIos(),l=A.isAndroid(),d=[n,i,t,o].filter(Boolean).length>1,h=ge.getTruncateString({string:e,charsStart:12,charsEnd:0,truncate:"end"});return d&&!a?u`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${()=>V.push("Downloads",{wallet:this.wallet})}
        ></wui-cta-button>
      `:!d&&t?u`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `:n&&s?u`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `:i&&l?u`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `:(this.style.display="none",null)}onAppStore(){this.wallet?.app_store&&A.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&A.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&A.openHref(this.wallet.homepage,"_blank")}};ht.styles=[Ki];pi([M({type:Object})],ht.prototype,"wallet",void 0);ht=pi([P("w3m-mobile-download-links")],ht);const Hi=Se`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: var(--wui-duration-lg);
    transition-timing-function: var(--wui-ease-out-power-2);
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }
`;var ue=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};class G extends U{constructor(){super(),this.wallet=V.state.data?.wallet,this.connector=V.state.data?.connector,this.timeout=void 0,this.secondaryBtnIcon="refresh",this.onConnect=void 0,this.onRender=void 0,this.onAutoConnect=void 0,this.isWalletConnect=!0,this.unsubscribe=[],this.imageSrc=Y.getWalletImage(this.wallet)??Y.getConnectorImage(this.connector),this.name=this.wallet?.name??this.connector?.name??"Wallet",this.isRetrying=!1,this.uri=k.state.wcUri,this.error=k.state.wcError,this.ready=!1,this.showRetry=!1,this.secondaryBtnLabel="Try again",this.secondaryLabel="Accept connection request in the wallet",this.isLoading=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(k.subscribeKey("wcUri",e=>{this.uri=e,this.isRetrying&&this.onRetry&&(this.isRetrying=!1,this.onConnect?.())}),k.subscribeKey("wcError",e=>this.error=e)),(A.isTelegram()||A.isSafari())&&A.isIos()&&k.state.wcUri&&this.onConnect?.()}firstUpdated(){this.onAutoConnect?.(),this.showRetry=!this.onAutoConnect}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),k.setWcError(!1),clearTimeout(this.timeout)}render(){this.onRender?.(),this.onShowRetry();const e=this.error?"Connection can be declined if a previous request is still active":this.secondaryLabel;let n=`Continue in ${this.name}`;return this.error&&(n="Connection declined"),u`
      <wui-flex
        data-error=${j(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${j(this.imageSrc)}></wui-wallet-image>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text variant="paragraph-500" color=${this.error?"error-100":"fg-100"}>
            ${n}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${e}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel?u`
              <wui-button
                variant="accent"
                size="md"
                ?disabled=${this.isRetrying||this.isLoading}
                @click=${this.onTryAgain.bind(this)}
                data-testid="w3m-connecting-widget-secondary-button"
              >
                <wui-icon color="inherit" slot="iconLeft" name=${this.secondaryBtnIcon}></wui-icon>
                ${this.secondaryBtnLabel}
              </wui-button>
            `:null}
      </wui-flex>

      ${this.isWalletConnect?u`
            <wui-flex .padding=${["0","xl","xl","xl"]} justifyContent="center">
              <wui-link @click=${this.onCopyUri} color="fg-200" data-testid="wui-link-copy">
                <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
                Copy link
              </wui-link>
            </wui-flex>
          `:null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onShowRetry(){this.error&&!this.showRetry&&(this.showRetry=!0,this.shadowRoot?.querySelector("wui-button")?.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"}))}onTryAgain(){k.setWcError(!1),this.onRetry?(this.isRetrying=!0,this.onRetry?.()):this.onConnect?.()}loaderTemplate(){const e=sn.state.themeVariables["--w3m-border-radius-master"],n=e?parseInt(e.replace("px",""),10):4;return u`<wui-loading-thumbnail radius=${n*9}></wui-loading-thumbnail>`}onCopyUri(){try{this.uri&&(A.copyToClopboard(this.uri),it.showSuccess("Link copied"))}catch{it.showError("Failed to copy")}}}G.styles=Hi;ue([B()],G.prototype,"isRetrying",void 0);ue([B()],G.prototype,"uri",void 0);ue([B()],G.prototype,"error",void 0);ue([B()],G.prototype,"ready",void 0);ue([B()],G.prototype,"showRetry",void 0);ue([B()],G.prototype,"secondaryBtnLabel",void 0);ue([B()],G.prototype,"secondaryLabel",void 0);ue([B()],G.prototype,"isLoading",void 0);ue([M({type:Boolean})],G.prototype,"isMobile",void 0);ue([M()],G.prototype,"onRetry",void 0);var Gi=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let Wn=class extends G{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-browser: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),oe.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}async onConnectProxy(){try{this.error=!1;const{connectors:e}=N.state,n=e.find(i=>i.type==="ANNOUNCED"&&i.info?.rdns===this.wallet?.rdns||i.type==="INJECTED"||i.name===this.wallet?.name);if(n)await k.connectExternal(n,n.chain);else throw new Error("w3m-connecting-wc-browser: No connector found");ci.close(),oe.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:this.wallet?.name||"Unknown"}})}catch(e){oe.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:e?.message??"Unknown"}}),this.error=!0}}};Wn=Gi([P("w3m-connecting-wc-browser")],Wn);var Yi=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let Sn=class extends G{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-desktop: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),oe.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"desktop"}})}onRenderProxy(){!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onConnectProxy(){if(this.wallet?.desktop_link&&this.uri)try{this.error=!1;const{desktop_link:e,name:n}=this.wallet,{redirect:i,href:o}=A.formatNativeUrl(e,this.uri);k.setWcLinking({name:n,href:o}),k.setRecentWallet(this.wallet),A.openHref(i,"_blank")}catch{this.error=!0}}};Sn=Yi([P("w3m-connecting-wc-desktop")],Sn);var Me=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let Ie=class extends G{constructor(){if(super(),this.btnLabelTimeout=void 0,this.redirectDeeplink=void 0,this.redirectUniversalLink=void 0,this.target=void 0,this.preferUniversalLinks=ie.state.experimental_preferUniversalLinks,this.isLoading=!0,this.onConnect=()=>{if(this.wallet?.mobile_link&&this.uri)try{this.error=!1;const{mobile_link:e,link_mode:n,name:i}=this.wallet,{redirect:o,redirectUniversalLink:t,href:a}=A.formatNativeUrl(e,this.uri,n);this.redirectDeeplink=o,this.redirectUniversalLink=t,this.target=A.isIframe()?"_top":"_self",k.setWcLinking({name:i,href:a}),k.setRecentWallet(this.wallet),this.preferUniversalLinks&&this.redirectUniversalLink?A.openHref(this.redirectUniversalLink,this.target):A.openHref(this.redirectDeeplink,this.target)}catch(e){oe.sendEvent({type:"track",event:"CONNECT_PROXY_ERROR",properties:{message:e instanceof Error?e.message:"Error parsing the deeplink",uri:this.uri,mobile_link:this.wallet.mobile_link,name:this.wallet.name}}),this.error=!0}},!this.wallet)throw new Error("w3m-connecting-wc-mobile: No wallet provided");this.secondaryBtnLabel="Open",this.secondaryLabel=ui.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.onHandleURI(),this.unsubscribe.push(k.subscribeKey("wcUri",()=>{this.onHandleURI()})),oe.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"mobile"}})}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.btnLabelTimeout)}onHandleURI(){this.isLoading=!this.uri,!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onTryAgain(){k.setWcError(!1),this.onConnect?.()}};Me([B()],Ie.prototype,"redirectDeeplink",void 0);Me([B()],Ie.prototype,"redirectUniversalLink",void 0);Me([B()],Ie.prototype,"target",void 0);Me([B()],Ie.prototype,"preferUniversalLinks",void 0);Me([B()],Ie.prototype,"isLoading",void 0);Ie=Me([P("w3m-connecting-wc-mobile")],Ie);var Ae={},Pt,Tn;function Ji(){return Tn||(Tn=1,Pt=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),Pt}var Lt={},xe={},Bn;function Pe(){if(Bn)return xe;Bn=1;let r;const e=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return xe.getSymbolSize=function(i){if(!i)throw new Error('"version" cannot be null or undefined');if(i<1||i>40)throw new Error('"version" should be in range from 1 to 40');return i*4+17},xe.getSymbolTotalCodewords=function(i){return e[i]},xe.getBCHDigit=function(n){let i=0;for(;n!==0;)i++,n>>>=1;return i},xe.setToSJISFunction=function(i){if(typeof i!="function")throw new Error('"toSJISFunc" is not a valid function.');r=i},xe.isKanjiModeEnabled=function(){return typeof r<"u"},xe.toSJIS=function(i){return r(i)},xe}var Ot={},Pn;function vn(){return Pn||(Pn=1,(function(r){r.L={bit:1},r.M={bit:0},r.Q={bit:3},r.H={bit:2};function e(n){if(typeof n!="string")throw new Error("Param is not a string");switch(n.toLowerCase()){case"l":case"low":return r.L;case"m":case"medium":return r.M;case"q":case"quartile":return r.Q;case"h":case"high":return r.H;default:throw new Error("Unknown EC Level: "+n)}}r.isValid=function(i){return i&&typeof i.bit<"u"&&i.bit>=0&&i.bit<4},r.from=function(i,o){if(r.isValid(i))return i;try{return e(i)}catch{return o}}})(Ot)),Ot}var At,Ln;function Qi(){if(Ln)return At;Ln=1;function r(){this.buffer=[],this.length=0}return r.prototype={get:function(e){const n=Math.floor(e/8);return(this.buffer[n]>>>7-e%8&1)===1},put:function(e,n){for(let i=0;i<n;i++)this.putBit((e>>>n-i-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(e){const n=Math.floor(this.length/8);this.buffer.length<=n&&this.buffer.push(0),e&&(this.buffer[n]|=128>>>this.length%8),this.length++}},At=r,At}var jt,On;function Xi(){if(On)return jt;On=1;function r(e){if(!e||e<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}return r.prototype.set=function(e,n,i,o){const t=e*this.size+n;this.data[t]=i,o&&(this.reservedBit[t]=!0)},r.prototype.get=function(e,n){return this.data[e*this.size+n]},r.prototype.xor=function(e,n,i){this.data[e*this.size+n]^=i},r.prototype.isReserved=function(e,n){return this.reservedBit[e*this.size+n]},jt=r,jt}var kt={},An;function Zi(){return An||(An=1,(function(r){const e=Pe().getSymbolSize;r.getRowColCoords=function(i){if(i===1)return[];const o=Math.floor(i/7)+2,t=e(i),a=t===145?26:Math.ceil((t-13)/(2*o-2))*2,s=[t-7];for(let l=1;l<o-1;l++)s[l]=s[l-1]-a;return s.push(6),s.reverse()},r.getPositions=function(i){const o=[],t=r.getRowColCoords(i),a=t.length;for(let s=0;s<a;s++)for(let l=0;l<a;l++)s===0&&l===0||s===0&&l===a-1||s===a-1&&l===0||o.push([t[s],t[l]]);return o}})(kt)),kt}var Dt={},jn;function eo(){if(jn)return Dt;jn=1;const r=Pe().getSymbolSize,e=7;return Dt.getPositions=function(i){const o=r(i);return[[0,0],[o-e,0],[0,o-e]]},Dt}var zt={},kn;function to(){return kn||(kn=1,(function(r){r.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const e={N1:3,N2:3,N3:40,N4:10};r.isValid=function(o){return o!=null&&o!==""&&!isNaN(o)&&o>=0&&o<=7},r.from=function(o){return r.isValid(o)?parseInt(o,10):void 0},r.getPenaltyN1=function(o){const t=o.size;let a=0,s=0,l=0,d=null,h=null;for(let w=0;w<t;w++){s=l=0,d=h=null;for(let x=0;x<t;x++){let p=o.get(w,x);p===d?s++:(s>=5&&(a+=e.N1+(s-5)),d=p,s=1),p=o.get(x,w),p===h?l++:(l>=5&&(a+=e.N1+(l-5)),h=p,l=1)}s>=5&&(a+=e.N1+(s-5)),l>=5&&(a+=e.N1+(l-5))}return a},r.getPenaltyN2=function(o){const t=o.size;let a=0;for(let s=0;s<t-1;s++)for(let l=0;l<t-1;l++){const d=o.get(s,l)+o.get(s,l+1)+o.get(s+1,l)+o.get(s+1,l+1);(d===4||d===0)&&a++}return a*e.N2},r.getPenaltyN3=function(o){const t=o.size;let a=0,s=0,l=0;for(let d=0;d<t;d++){s=l=0;for(let h=0;h<t;h++)s=s<<1&2047|o.get(d,h),h>=10&&(s===1488||s===93)&&a++,l=l<<1&2047|o.get(h,d),h>=10&&(l===1488||l===93)&&a++}return a*e.N3},r.getPenaltyN4=function(o){let t=0;const a=o.data.length;for(let l=0;l<a;l++)t+=o.data[l];return Math.abs(Math.ceil(t*100/a/5)-10)*e.N4};function n(i,o,t){switch(i){case r.Patterns.PATTERN000:return(o+t)%2===0;case r.Patterns.PATTERN001:return o%2===0;case r.Patterns.PATTERN010:return t%3===0;case r.Patterns.PATTERN011:return(o+t)%3===0;case r.Patterns.PATTERN100:return(Math.floor(o/2)+Math.floor(t/3))%2===0;case r.Patterns.PATTERN101:return o*t%2+o*t%3===0;case r.Patterns.PATTERN110:return(o*t%2+o*t%3)%2===0;case r.Patterns.PATTERN111:return(o*t%3+(o+t)%2)%2===0;default:throw new Error("bad maskPattern:"+i)}}r.applyMask=function(o,t){const a=t.size;for(let s=0;s<a;s++)for(let l=0;l<a;l++)t.isReserved(l,s)||t.xor(l,s,n(o,l,s))},r.getBestMask=function(o,t){const a=Object.keys(r.Patterns).length;let s=0,l=1/0;for(let d=0;d<a;d++){t(d),r.applyMask(d,o);const h=r.getPenaltyN1(o)+r.getPenaltyN2(o)+r.getPenaltyN3(o)+r.getPenaltyN4(o);r.applyMask(d,o),h<l&&(l=h,s=d)}return s}})(zt)),zt}var nt={},Dn;function gi(){if(Dn)return nt;Dn=1;const r=vn(),e=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],n=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return nt.getBlocksCount=function(o,t){switch(t){case r.L:return e[(o-1)*4+0];case r.M:return e[(o-1)*4+1];case r.Q:return e[(o-1)*4+2];case r.H:return e[(o-1)*4+3];default:return}},nt.getTotalCodewordsCount=function(o,t){switch(t){case r.L:return n[(o-1)*4+0];case r.M:return n[(o-1)*4+1];case r.Q:return n[(o-1)*4+2];case r.H:return n[(o-1)*4+3];default:return}},nt}var Nt={},Fe={},zn;function no(){if(zn)return Fe;zn=1;const r=new Uint8Array(512),e=new Uint8Array(256);return(function(){let i=1;for(let o=0;o<255;o++)r[o]=i,e[i]=o,i<<=1,i&256&&(i^=285);for(let o=255;o<512;o++)r[o]=r[o-255]})(),Fe.log=function(i){if(i<1)throw new Error("log("+i+")");return e[i]},Fe.exp=function(i){return r[i]},Fe.mul=function(i,o){return i===0||o===0?0:r[e[i]+e[o]]},Fe}var Nn;function io(){return Nn||(Nn=1,(function(r){const e=no();r.mul=function(i,o){const t=new Uint8Array(i.length+o.length-1);for(let a=0;a<i.length;a++)for(let s=0;s<o.length;s++)t[a+s]^=e.mul(i[a],o[s]);return t},r.mod=function(i,o){let t=new Uint8Array(i);for(;t.length-o.length>=0;){const a=t[0];for(let l=0;l<o.length;l++)t[l]^=e.mul(o[l],a);let s=0;for(;s<t.length&&t[s]===0;)s++;t=t.slice(s)}return t},r.generateECPolynomial=function(i){let o=new Uint8Array([1]);for(let t=0;t<i;t++)o=r.mul(o,new Uint8Array([1,e.exp(t)]));return o}})(Nt)),Nt}var Mt,Mn;function oo(){if(Mn)return Mt;Mn=1;const r=io();function e(n){this.genPoly=void 0,this.degree=n,this.degree&&this.initialize(this.degree)}return e.prototype.initialize=function(i){this.degree=i,this.genPoly=r.generateECPolynomial(this.degree)},e.prototype.encode=function(i){if(!this.genPoly)throw new Error("Encoder not initialized");const o=new Uint8Array(i.length+this.degree);o.set(i);const t=r.mod(o,this.genPoly),a=this.degree-t.length;if(a>0){const s=new Uint8Array(this.degree);return s.set(t,a),s}return t},Mt=e,Mt}var Ut={},qt={},Ft={},Un;function wi(){return Un||(Un=1,Ft.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}),Ft}var se={},qn;function mi(){if(qn)return se;qn=1;const r="[0-9]+",e="[A-Z $%*+\\-./:]+";let n="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";n=n.replace(/u/g,"\\u");const i="(?:(?![A-Z0-9 $%*+\\-./:]|"+n+`)(?:.|[\r
]))+`;se.KANJI=new RegExp(n,"g"),se.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),se.BYTE=new RegExp(i,"g"),se.NUMERIC=new RegExp(r,"g"),se.ALPHANUMERIC=new RegExp(e,"g");const o=new RegExp("^"+n+"$"),t=new RegExp("^"+r+"$"),a=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return se.testKanji=function(l){return o.test(l)},se.testNumeric=function(l){return t.test(l)},se.testAlphanumeric=function(l){return a.test(l)},se}var Fn;function Le(){return Fn||(Fn=1,(function(r){const e=wi(),n=mi();r.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},r.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},r.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},r.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},r.MIXED={bit:-1},r.getCharCountIndicator=function(t,a){if(!t.ccBits)throw new Error("Invalid mode: "+t);if(!e.isValid(a))throw new Error("Invalid version: "+a);return a>=1&&a<10?t.ccBits[0]:a<27?t.ccBits[1]:t.ccBits[2]},r.getBestModeForData=function(t){return n.testNumeric(t)?r.NUMERIC:n.testAlphanumeric(t)?r.ALPHANUMERIC:n.testKanji(t)?r.KANJI:r.BYTE},r.toString=function(t){if(t&&t.id)return t.id;throw new Error("Invalid mode")},r.isValid=function(t){return t&&t.bit&&t.ccBits};function i(o){if(typeof o!="string")throw new Error("Param is not a string");switch(o.toLowerCase()){case"numeric":return r.NUMERIC;case"alphanumeric":return r.ALPHANUMERIC;case"kanji":return r.KANJI;case"byte":return r.BYTE;default:throw new Error("Unknown mode: "+o)}}r.from=function(t,a){if(r.isValid(t))return t;try{return i(t)}catch{return a}}})(qt)),qt}var Vn;function ro(){return Vn||(Vn=1,(function(r){const e=Pe(),n=gi(),i=vn(),o=Le(),t=wi(),a=7973,s=e.getBCHDigit(a);function l(x,p,E){for(let v=1;v<=40;v++)if(p<=r.getCapacity(v,E,x))return v}function d(x,p){return o.getCharCountIndicator(x,p)+4}function h(x,p){let E=0;return x.forEach(function(v){const W=d(v.mode,p);E+=W+v.getBitsLength()}),E}function w(x,p){for(let E=1;E<=40;E++)if(h(x,E)<=r.getCapacity(E,p,o.MIXED))return E}r.from=function(p,E){return t.isValid(p)?parseInt(p,10):E},r.getCapacity=function(p,E,v){if(!t.isValid(p))throw new Error("Invalid QR Code version");typeof v>"u"&&(v=o.BYTE);const W=e.getSymbolTotalCodewords(p),m=n.getTotalCodewordsCount(p,E),g=(W-m)*8;if(v===o.MIXED)return g;const b=g-d(v,p);switch(v){case o.NUMERIC:return Math.floor(b/10*3);case o.ALPHANUMERIC:return Math.floor(b/11*2);case o.KANJI:return Math.floor(b/13);case o.BYTE:default:return Math.floor(b/8)}},r.getBestVersionForData=function(p,E){let v;const W=i.from(E,i.M);if(Array.isArray(p)){if(p.length>1)return w(p,W);if(p.length===0)return 1;v=p[0]}else v=p;return l(v.mode,v.getLength(),W)},r.getEncodedBits=function(p){if(!t.isValid(p)||p<7)throw new Error("Invalid QR Code version");let E=p<<12;for(;e.getBCHDigit(E)-s>=0;)E^=a<<e.getBCHDigit(E)-s;return p<<12|E}})(Ut)),Ut}var Vt={},Kn;function ao(){if(Kn)return Vt;Kn=1;const r=Pe(),e=1335,n=21522,i=r.getBCHDigit(e);return Vt.getEncodedBits=function(t,a){const s=t.bit<<3|a;let l=s<<10;for(;r.getBCHDigit(l)-i>=0;)l^=e<<r.getBCHDigit(l)-i;return(s<<10|l)^n},Vt}var Kt={},Ht,Hn;function so(){if(Hn)return Ht;Hn=1;const r=Le();function e(n){this.mode=r.NUMERIC,this.data=n.toString()}return e.getBitsLength=function(i){return 10*Math.floor(i/3)+(i%3?i%3*3+1:0)},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(i){let o,t,a;for(o=0;o+3<=this.data.length;o+=3)t=this.data.substr(o,3),a=parseInt(t,10),i.put(a,10);const s=this.data.length-o;s>0&&(t=this.data.substr(o),a=parseInt(t,10),i.put(a,s*3+1))},Ht=e,Ht}var Gt,Gn;function lo(){if(Gn)return Gt;Gn=1;const r=Le(),e=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function n(i){this.mode=r.ALPHANUMERIC,this.data=i}return n.getBitsLength=function(o){return 11*Math.floor(o/2)+6*(o%2)},n.prototype.getLength=function(){return this.data.length},n.prototype.getBitsLength=function(){return n.getBitsLength(this.data.length)},n.prototype.write=function(o){let t;for(t=0;t+2<=this.data.length;t+=2){let a=e.indexOf(this.data[t])*45;a+=e.indexOf(this.data[t+1]),o.put(a,11)}this.data.length%2&&o.put(e.indexOf(this.data[t]),6)},Gt=n,Gt}var Yt,Yn;function co(){return Yn||(Yn=1,Yt=function(e){for(var n=[],i=e.length,o=0;o<i;o++){var t=e.charCodeAt(o);if(t>=55296&&t<=56319&&i>o+1){var a=e.charCodeAt(o+1);a>=56320&&a<=57343&&(t=(t-55296)*1024+a-56320+65536,o+=1)}if(t<128){n.push(t);continue}if(t<2048){n.push(t>>6|192),n.push(t&63|128);continue}if(t<55296||t>=57344&&t<65536){n.push(t>>12|224),n.push(t>>6&63|128),n.push(t&63|128);continue}if(t>=65536&&t<=1114111){n.push(t>>18|240),n.push(t>>12&63|128),n.push(t>>6&63|128),n.push(t&63|128);continue}n.push(239,191,189)}return new Uint8Array(n).buffer}),Yt}var Jt,Jn;function uo(){if(Jn)return Jt;Jn=1;const r=co(),e=Le();function n(i){this.mode=e.BYTE,typeof i=="string"&&(i=r(i)),this.data=new Uint8Array(i)}return n.getBitsLength=function(o){return o*8},n.prototype.getLength=function(){return this.data.length},n.prototype.getBitsLength=function(){return n.getBitsLength(this.data.length)},n.prototype.write=function(i){for(let o=0,t=this.data.length;o<t;o++)i.put(this.data[o],8)},Jt=n,Jt}var Qt,Qn;function ho(){if(Qn)return Qt;Qn=1;const r=Le(),e=Pe();function n(i){this.mode=r.KANJI,this.data=i}return n.getBitsLength=function(o){return o*13},n.prototype.getLength=function(){return this.data.length},n.prototype.getBitsLength=function(){return n.getBitsLength(this.data.length)},n.prototype.write=function(i){let o;for(o=0;o<this.data.length;o++){let t=e.toSJIS(this.data[o]);if(t>=33088&&t<=40956)t-=33088;else if(t>=57408&&t<=60351)t-=49472;else throw new Error("Invalid SJIS character: "+this.data[o]+`
Make sure your charset is UTF-8`);t=(t>>>8&255)*192+(t&255),i.put(t,13)}},Qt=n,Qt}var Xt={exports:{}},Xn;function fo(){return Xn||(Xn=1,(function(r){var e={single_source_shortest_paths:function(n,i,o){var t={},a={};a[i]=0;var s=e.PriorityQueue.make();s.push(i,0);for(var l,d,h,w,x,p,E,v,W;!s.empty();){l=s.pop(),d=l.value,w=l.cost,x=n[d]||{};for(h in x)x.hasOwnProperty(h)&&(p=x[h],E=w+p,v=a[h],W=typeof a[h]>"u",(W||v>E)&&(a[h]=E,s.push(h,E),t[h]=d))}if(typeof o<"u"&&typeof a[o]>"u"){var m=["Could not find a path from ",i," to ",o,"."].join("");throw new Error(m)}return t},extract_shortest_path_from_predecessor_list:function(n,i){for(var o=[],t=i;t;)o.push(t),n[t],t=n[t];return o.reverse(),o},find_path:function(n,i,o){var t=e.single_source_shortest_paths(n,i,o);return e.extract_shortest_path_from_predecessor_list(t,o)},PriorityQueue:{make:function(n){var i=e.PriorityQueue,o={},t;n=n||{};for(t in i)i.hasOwnProperty(t)&&(o[t]=i[t]);return o.queue=[],o.sorter=n.sorter||i.default_sorter,o},default_sorter:function(n,i){return n.cost-i.cost},push:function(n,i){var o={value:n,cost:i};this.queue.push(o),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};r.exports=e})(Xt)),Xt.exports}var Zn;function po(){return Zn||(Zn=1,(function(r){const e=Le(),n=so(),i=lo(),o=uo(),t=ho(),a=mi(),s=Pe(),l=fo();function d(m){return unescape(encodeURIComponent(m)).length}function h(m,g,b){const f=[];let D;for(;(D=m.exec(b))!==null;)f.push({data:D[0],index:D.index,mode:g,length:D[0].length});return f}function w(m){const g=h(a.NUMERIC,e.NUMERIC,m),b=h(a.ALPHANUMERIC,e.ALPHANUMERIC,m);let f,D;return s.isKanjiModeEnabled()?(f=h(a.BYTE,e.BYTE,m),D=h(a.KANJI,e.KANJI,m)):(f=h(a.BYTE_KANJI,e.BYTE,m),D=[]),g.concat(b,f,D).sort(function(S,_){return S.index-_.index}).map(function(S){return{data:S.data,mode:S.mode,length:S.length}})}function x(m,g){switch(g){case e.NUMERIC:return n.getBitsLength(m);case e.ALPHANUMERIC:return i.getBitsLength(m);case e.KANJI:return t.getBitsLength(m);case e.BYTE:return o.getBitsLength(m)}}function p(m){return m.reduce(function(g,b){const f=g.length-1>=0?g[g.length-1]:null;return f&&f.mode===b.mode?(g[g.length-1].data+=b.data,g):(g.push(b),g)},[])}function E(m){const g=[];for(let b=0;b<m.length;b++){const f=m[b];switch(f.mode){case e.NUMERIC:g.push([f,{data:f.data,mode:e.ALPHANUMERIC,length:f.length},{data:f.data,mode:e.BYTE,length:f.length}]);break;case e.ALPHANUMERIC:g.push([f,{data:f.data,mode:e.BYTE,length:f.length}]);break;case e.KANJI:g.push([f,{data:f.data,mode:e.BYTE,length:d(f.data)}]);break;case e.BYTE:g.push([{data:f.data,mode:e.BYTE,length:d(f.data)}])}}return g}function v(m,g){const b={},f={start:{}};let D=["start"];for(let C=0;C<m.length;C++){const S=m[C],_=[];for(let y=0;y<S.length;y++){const L=S[y],R=""+C+y;_.push(R),b[R]={node:L,lastCount:0},f[R]={};for(let T=0;T<D.length;T++){const $=D[T];b[$]&&b[$].node.mode===L.mode?(f[$][R]=x(b[$].lastCount+L.length,L.mode)-x(b[$].lastCount,L.mode),b[$].lastCount+=L.length):(b[$]&&(b[$].lastCount=L.length),f[$][R]=x(L.length,L.mode)+4+e.getCharCountIndicator(L.mode,g))}}D=_}for(let C=0;C<D.length;C++)f[D[C]].end=0;return{map:f,table:b}}function W(m,g){let b;const f=e.getBestModeForData(m);if(b=e.from(g,f),b!==e.BYTE&&b.bit<f.bit)throw new Error('"'+m+'" cannot be encoded with mode '+e.toString(b)+`.
 Suggested mode is: `+e.toString(f));switch(b===e.KANJI&&!s.isKanjiModeEnabled()&&(b=e.BYTE),b){case e.NUMERIC:return new n(m);case e.ALPHANUMERIC:return new i(m);case e.KANJI:return new t(m);case e.BYTE:return new o(m)}}r.fromArray=function(g){return g.reduce(function(b,f){return typeof f=="string"?b.push(W(f,null)):f.data&&b.push(W(f.data,f.mode)),b},[])},r.fromString=function(g,b){const f=w(g,s.isKanjiModeEnabled()),D=E(f),C=v(D,b),S=l.find_path(C.map,"start","end"),_=[];for(let y=1;y<S.length-1;y++)_.push(C.table[S[y]].node);return r.fromArray(p(_))},r.rawSplit=function(g){return r.fromArray(w(g,s.isKanjiModeEnabled()))}})(Kt)),Kt}var ei;function go(){if(ei)return Lt;ei=1;const r=Pe(),e=vn(),n=Qi(),i=Xi(),o=Zi(),t=eo(),a=to(),s=gi(),l=oo(),d=ro(),h=ao(),w=Le(),x=po();function p(C,S){const _=C.size,y=t.getPositions(S);for(let L=0;L<y.length;L++){const R=y[L][0],T=y[L][1];for(let $=-1;$<=7;$++)if(!(R+$<=-1||_<=R+$))for(let O=-1;O<=7;O++)T+O<=-1||_<=T+O||($>=0&&$<=6&&(O===0||O===6)||O>=0&&O<=6&&($===0||$===6)||$>=2&&$<=4&&O>=2&&O<=4?C.set(R+$,T+O,!0,!0):C.set(R+$,T+O,!1,!0))}}function E(C){const S=C.size;for(let _=8;_<S-8;_++){const y=_%2===0;C.set(_,6,y,!0),C.set(6,_,y,!0)}}function v(C,S){const _=o.getPositions(S);for(let y=0;y<_.length;y++){const L=_[y][0],R=_[y][1];for(let T=-2;T<=2;T++)for(let $=-2;$<=2;$++)T===-2||T===2||$===-2||$===2||T===0&&$===0?C.set(L+T,R+$,!0,!0):C.set(L+T,R+$,!1,!0)}}function W(C,S){const _=C.size,y=d.getEncodedBits(S);let L,R,T;for(let $=0;$<18;$++)L=Math.floor($/3),R=$%3+_-8-3,T=(y>>$&1)===1,C.set(L,R,T,!0),C.set(R,L,T,!0)}function m(C,S,_){const y=C.size,L=h.getEncodedBits(S,_);let R,T;for(R=0;R<15;R++)T=(L>>R&1)===1,R<6?C.set(R,8,T,!0):R<8?C.set(R+1,8,T,!0):C.set(y-15+R,8,T,!0),R<8?C.set(8,y-R-1,T,!0):R<9?C.set(8,15-R-1+1,T,!0):C.set(8,15-R-1,T,!0);C.set(y-8,8,1,!0)}function g(C,S){const _=C.size;let y=-1,L=_-1,R=7,T=0;for(let $=_-1;$>0;$-=2)for($===6&&$--;;){for(let O=0;O<2;O++)if(!C.isReserved(L,$-O)){let ye=!1;T<S.length&&(ye=(S[T]>>>R&1)===1),C.set(L,$-O,ye),R--,R===-1&&(T++,R=7)}if(L+=y,L<0||_<=L){L-=y,y=-y;break}}}function b(C,S,_){const y=new n;_.forEach(function(O){y.put(O.mode.bit,4),y.put(O.getLength(),w.getCharCountIndicator(O.mode,C)),O.write(y)});const L=r.getSymbolTotalCodewords(C),R=s.getTotalCodewordsCount(C,S),T=(L-R)*8;for(y.getLengthInBits()+4<=T&&y.put(0,4);y.getLengthInBits()%8!==0;)y.putBit(0);const $=(T-y.getLengthInBits())/8;for(let O=0;O<$;O++)y.put(O%2?17:236,8);return f(y,C,S)}function f(C,S,_){const y=r.getSymbolTotalCodewords(S),L=s.getTotalCodewordsCount(S,_),R=y-L,T=s.getBlocksCount(S,_),$=y%T,O=T-$,ye=Math.floor(y/T),qe=Math.floor(R/T),_i=qe+1,Rn=ye-qe,Ii=new l(Rn);let Et=0;const tt=new Array(T),$n=new Array(T);let Wt=0;const Ei=new Uint8Array(C.buffer);for(let Oe=0;Oe<T;Oe++){const Tt=Oe<O?qe:_i;tt[Oe]=Ei.slice(Et,Et+Tt),$n[Oe]=Ii.encode(tt[Oe]),Et+=Tt,Wt=Math.max(Wt,Tt)}const St=new Uint8Array(y);let _n=0,he,fe;for(he=0;he<Wt;he++)for(fe=0;fe<T;fe++)he<tt[fe].length&&(St[_n++]=tt[fe][he]);for(he=0;he<Rn;he++)for(fe=0;fe<T;fe++)St[_n++]=$n[fe][he];return St}function D(C,S,_,y){let L;if(Array.isArray(C))L=x.fromArray(C);else if(typeof C=="string"){let ye=S;if(!ye){const qe=x.rawSplit(C);ye=d.getBestVersionForData(qe,_)}L=x.fromString(C,ye||40)}else throw new Error("Invalid data");const R=d.getBestVersionForData(L,_);if(!R)throw new Error("The amount of data is too big to be stored in a QR Code");if(!S)S=R;else if(S<R)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+R+`.
`);const T=b(S,_,L),$=r.getSymbolSize(S),O=new i($);return p(O,S),E(O),v(O,S),m(O,_,0),S>=7&&W(O,S),g(O,T),isNaN(y)&&(y=a.getBestMask(O,m.bind(null,O,_))),a.applyMask(y,O),m(O,_,y),{modules:O,version:S,errorCorrectionLevel:_,maskPattern:y,segments:L}}return Lt.create=function(S,_){if(typeof S>"u"||S==="")throw new Error("No input text");let y=e.M,L,R;return typeof _<"u"&&(y=e.from(_.errorCorrectionLevel,e.M),L=d.from(_.version),R=a.from(_.maskPattern),_.toSJISFunc&&r.setToSJISFunction(_.toSJISFunc)),D(S,L,y,R)},Lt}var Zt={},en={},ti;function bi(){return ti||(ti=1,(function(r){function e(n){if(typeof n=="number"&&(n=n.toString()),typeof n!="string")throw new Error("Color should be defined as hex string");let i=n.slice().replace("#","").split("");if(i.length<3||i.length===5||i.length>8)throw new Error("Invalid hex color: "+n);(i.length===3||i.length===4)&&(i=Array.prototype.concat.apply([],i.map(function(t){return[t,t]}))),i.length===6&&i.push("F","F");const o=parseInt(i.join(""),16);return{r:o>>24&255,g:o>>16&255,b:o>>8&255,a:o&255,hex:"#"+i.slice(0,6).join("")}}r.getOptions=function(i){i||(i={}),i.color||(i.color={});const o=typeof i.margin>"u"||i.margin===null||i.margin<0?4:i.margin,t=i.width&&i.width>=21?i.width:void 0,a=i.scale||4;return{width:t,scale:t?4:a,margin:o,color:{dark:e(i.color.dark||"#000000ff"),light:e(i.color.light||"#ffffffff")},type:i.type,rendererOpts:i.rendererOpts||{}}},r.getScale=function(i,o){return o.width&&o.width>=i+o.margin*2?o.width/(i+o.margin*2):o.scale},r.getImageWidth=function(i,o){const t=r.getScale(i,o);return Math.floor((i+o.margin*2)*t)},r.qrToImageData=function(i,o,t){const a=o.modules.size,s=o.modules.data,l=r.getScale(a,t),d=Math.floor((a+t.margin*2)*l),h=t.margin*l,w=[t.color.light,t.color.dark];for(let x=0;x<d;x++)for(let p=0;p<d;p++){let E=(x*d+p)*4,v=t.color.light;if(x>=h&&p>=h&&x<d-h&&p<d-h){const W=Math.floor((x-h)/l),m=Math.floor((p-h)/l);v=w[s[W*a+m]?1:0]}i[E++]=v.r,i[E++]=v.g,i[E++]=v.b,i[E]=v.a}}})(en)),en}var ni;function wo(){return ni||(ni=1,(function(r){const e=bi();function n(o,t,a){o.clearRect(0,0,t.width,t.height),t.style||(t.style={}),t.height=a,t.width=a,t.style.height=a+"px",t.style.width=a+"px"}function i(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}r.render=function(t,a,s){let l=s,d=a;typeof l>"u"&&(!a||!a.getContext)&&(l=a,a=void 0),a||(d=i()),l=e.getOptions(l);const h=e.getImageWidth(t.modules.size,l),w=d.getContext("2d"),x=w.createImageData(h,h);return e.qrToImageData(x.data,t,l),n(w,d,h),w.putImageData(x,0,0),d},r.renderToDataURL=function(t,a,s){let l=s;typeof l>"u"&&(!a||!a.getContext)&&(l=a,a=void 0),l||(l={});const d=r.render(t,a,l),h=l.type||"image/png",w=l.rendererOpts||{};return d.toDataURL(h,w.quality)}})(Zt)),Zt}var tn={},ii;function mo(){if(ii)return tn;ii=1;const r=bi();function e(o,t){const a=o.a/255,s=t+'="'+o.hex+'"';return a<1?s+" "+t+'-opacity="'+a.toFixed(2).slice(1)+'"':s}function n(o,t,a){let s=o+t;return typeof a<"u"&&(s+=" "+a),s}function i(o,t,a){let s="",l=0,d=!1,h=0;for(let w=0;w<o.length;w++){const x=Math.floor(w%t),p=Math.floor(w/t);!x&&!d&&(d=!0),o[w]?(h++,w>0&&x>0&&o[w-1]||(s+=d?n("M",x+a,.5+p+a):n("m",l,0),l=0,d=!1),x+1<t&&o[w+1]||(s+=n("h",h),h=0)):l++}return s}return tn.render=function(t,a,s){const l=r.getOptions(a),d=t.modules.size,h=t.modules.data,w=d+l.margin*2,x=l.color.light.a?"<path "+e(l.color.light,"fill")+' d="M0 0h'+w+"v"+w+'H0z"/>':"",p="<path "+e(l.color.dark,"stroke")+' d="'+i(h,d,l.margin)+'"/>',E='viewBox="0 0 '+w+" "+w+'"',W='<svg xmlns="http://www.w3.org/2000/svg" '+(l.width?'width="'+l.width+'" height="'+l.width+'" ':"")+E+' shape-rendering="crispEdges">'+x+p+`</svg>
`;return typeof s=="function"&&s(null,W),W},tn}var oi;function bo(){if(oi)return Ae;oi=1;const r=Ji(),e=go(),n=wo(),i=mo();function o(t,a,s,l,d){const h=[].slice.call(arguments,1),w=h.length,x=typeof h[w-1]=="function";if(!x&&!r())throw new Error("Callback required as last argument");if(x){if(w<2)throw new Error("Too few arguments provided");w===2?(d=s,s=a,a=l=void 0):w===3&&(a.getContext&&typeof d>"u"?(d=l,l=void 0):(d=l,l=s,s=a,a=void 0))}else{if(w<1)throw new Error("Too few arguments provided");return w===1?(s=a,a=l=void 0):w===2&&!a.getContext&&(l=s,s=a,a=void 0),new Promise(function(p,E){try{const v=e.create(s,l);p(t(v,a,l))}catch(v){E(v)}})}try{const p=e.create(s,l);d(null,t(p,a,l))}catch(p){d(p)}}return Ae.create=e.create,Ae.toCanvas=o.bind(null,n.render),Ae.toDataURL=o.bind(null,n.renderToDataURL),Ae.toString=o.bind(null,function(t,a,s){return i.render(t,s)}),Ae}var vo=bo();const yo=Li(vo),xo=.1,ri=2.5,pe=7;function nn(r,e,n){return r===e?!1:(r-e<0?e-r:r-e)<=n+xo}function Co(r,e){const n=Array.prototype.slice.call(yo.create(r,{errorCorrectionLevel:e}).modules.data,0),i=Math.sqrt(n.length);return n.reduce((o,t,a)=>(a%i===0?o.push([t]):o[o.length-1].push(t))&&o,[])}const Ro={generate({uri:r,size:e,logoSize:n,dotColor:i="#141414"}){const o="transparent",a=[],s=Co(r,"Q"),l=e/s.length,d=[{x:0,y:0},{x:1,y:0},{x:0,y:1}];d.forEach(({x:v,y:W})=>{const m=(s.length-pe)*l*v,g=(s.length-pe)*l*W,b=.45;for(let f=0;f<d.length;f+=1){const D=l*(pe-f*2);a.push(Ve`
            <rect
              fill=${f===2?i:o}
              width=${f===0?D-5:D}
              rx= ${f===0?(D-5)*b:D*b}
              ry= ${f===0?(D-5)*b:D*b}
              stroke=${i}
              stroke-width=${f===0?5:0}
              height=${f===0?D-5:D}
              x= ${f===0?g+l*f+5/2:g+l*f}
              y= ${f===0?m+l*f+5/2:m+l*f}
            />
          `)}});const h=Math.floor((n+25)/l),w=s.length/2-h/2,x=s.length/2+h/2-1,p=[];s.forEach((v,W)=>{v.forEach((m,g)=>{if(s[W][g]&&!(W<pe&&g<pe||W>s.length-(pe+1)&&g<pe||W<pe&&g>s.length-(pe+1))&&!(W>w&&W<x&&g>w&&g<x)){const b=W*l+l/2,f=g*l+l/2;p.push([b,f])}})});const E={};return p.forEach(([v,W])=>{E[v]?E[v]?.push(W):E[v]=[W]}),Object.entries(E).map(([v,W])=>{const m=W.filter(g=>W.every(b=>!nn(g,b,l)));return[Number(v),m]}).forEach(([v,W])=>{W.forEach(m=>{a.push(Ve`<circle cx=${v} cy=${m} fill=${i} r=${l/ri} />`)})}),Object.entries(E).filter(([v,W])=>W.length>1).map(([v,W])=>{const m=W.filter(g=>W.some(b=>nn(g,b,l)));return[Number(v),m]}).map(([v,W])=>{W.sort((g,b)=>g<b?-1:1);const m=[];for(const g of W){const b=m.find(f=>f.some(D=>nn(g,D,l)));b?b.push(g):m.push([g])}return[v,m.map(g=>[g[0],g[g.length-1]])]}).forEach(([v,W])=>{W.forEach(([m,g])=>{a.push(Ve`
              <line
                x1=${v}
                x2=${v}
                y1=${m}
                y2=${g}
                stroke=${i}
                stroke-width=${l/(ri/2)}
                stroke-linecap="round"
              />
            `)})}),a}},$o=q`
  :host {
    position: relative;
    user-select: none;
    display: block;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    width: var(--local-size);
  }

  :host([data-theme='dark']) {
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px);
    background-color: var(--wui-color-inverse-100);
    padding: var(--wui-spacing-l);
  }

  :host([data-theme='light']) {
    box-shadow: 0 0 0 1px var(--wui-color-bg-125);
    background-color: var(--wui-color-bg-125);
  }

  :host([data-clear='true']) > wui-icon {
    display: none;
  }

  svg:first-child,
  wui-image,
  wui-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }

  wui-image {
    width: 25%;
    height: 25%;
    border-radius: var(--wui-border-radius-xs);
  }

  wui-icon {
    width: 100%;
    height: 100%;
    color: var(--local-icon-color) !important;
    transform: translateY(-50%) translateX(-50%) scale(0.25);
  }
`;var ve=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};const _o="#3396ff";let re=class extends F{constructor(){super(...arguments),this.uri="",this.size=0,this.theme="dark",this.imageSrc=void 0,this.alt=void 0,this.arenaClear=void 0,this.farcaster=void 0}render(){return this.dataset.theme=this.theme,this.dataset.clear=String(this.arenaClear),this.style.cssText=`
     --local-size: ${this.size}px;
     --local-icon-color: ${this.color??_o}
    `,I`${this.templateVisual()} ${this.templateSvg()}`}templateSvg(){const e=this.theme==="light"?this.size:this.size-32;return Ve`
      <svg height=${e} width=${e}>
        ${Ro.generate({uri:this.uri,size:e,logoSize:this.arenaClear?0:e/4,dotColor:this.color})}
      </svg>
    `}templateVisual(){return this.imageSrc?I`<wui-image src=${this.imageSrc} alt=${this.alt??"logo"}></wui-image>`:this.farcaster?I`<wui-icon
        class="farcaster"
        size="inherit"
        color="inherit"
        name="farcaster"
      ></wui-icon>`:I`<wui-icon size="inherit" color="inherit" name="walletConnect"></wui-icon>`}};re.styles=[K,$o];ve([c()],re.prototype,"uri",void 0);ve([c({type:Number})],re.prototype,"size",void 0);ve([c()],re.prototype,"theme",void 0);ve([c()],re.prototype,"imageSrc",void 0);ve([c()],re.prototype,"alt",void 0);ve([c()],re.prototype,"color",void 0);ve([c({type:Boolean})],re.prototype,"arenaClear",void 0);ve([c({type:Boolean})],re.prototype,"farcaster",void 0);re=ve([P("wui-qr-code")],re);const Io=q`
  :host {
    display: block;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-200) 5%,
      var(--wui-color-bg-200) 48%,
      var(--wui-color-bg-300) 55%,
      var(--wui-color-bg-300) 60%,
      var(--wui-color-bg-300) calc(60% + 10px),
      var(--wui-color-bg-200) calc(60% + 12px),
      var(--wui-color-bg-200) 100%
    );
    background-size: 250%;
    animation: shimmer 3s linear infinite reverse;
  }

  :host([variant='light']) {
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-150) 5%,
      var(--wui-color-bg-150) 48%,
      var(--wui-color-bg-200) 55%,
      var(--wui-color-bg-200) 60%,
      var(--wui-color-bg-200) calc(60% + 10px),
      var(--wui-color-bg-150) calc(60% + 12px),
      var(--wui-color-bg-150) 100%
    );
    background-size: 250%;
  }

  @keyframes shimmer {
    from {
      background-position: -250% 0;
    }
    to {
      background-position: 250% 0;
    }
  }
`;var Xe=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let Ee=class extends F{constructor(){super(...arguments),this.width="",this.height="",this.borderRadius="m",this.variant="default"}render(){return this.style.cssText=`
      width: ${this.width};
      height: ${this.height};
      border-radius: ${`clamp(0px,var(--wui-border-radius-${this.borderRadius}), 40px)`};
    `,I`<slot></slot>`}};Ee.styles=[Io];Xe([c()],Ee.prototype,"width",void 0);Xe([c()],Ee.prototype,"height",void 0);Xe([c()],Ee.prototype,"borderRadius",void 0);Xe([c()],Ee.prototype,"variant",void 0);Ee=Xe([P("wui-shimmer")],Ee);const Eo="https://reown.com",Wo=q`
  .reown-logo {
    height: var(--wui-spacing-xxl);
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  a:hover {
    opacity: 0.9;
  }
`;var So=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let ln=class extends F{render(){return I`
      <a
        data-testid="ux-branding-reown"
        href=${Eo}
        rel="noreferrer"
        target="_blank"
        style="text-decoration: none;"
      >
        <wui-flex
          justifyContent="center"
          alignItems="center"
          gap="xs"
          .padding=${["0","0","l","0"]}
        >
          <wui-text variant="small-500" color="fg-100"> UX by </wui-text>
          <wui-icon name="reown" size="xxxl" class="reown-logo"></wui-icon>
        </wui-flex>
      </a>
    `}};ln.styles=[K,Q,Wo];ln=So([P("wui-ux-by-reown")],ln);const To=Se`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px) !important;
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: 200ms;
    animation-timing-function: ease;
    animation-name: fadein;
    animation-fill-mode: forwards;
  }
`;var Bo=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let cn=class extends G{constructor(){super(),this.forceUpdate=()=>{this.requestUpdate()},window.addEventListener("resize",this.forceUpdate),oe.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet?.name??"WalletConnect",platform:"qrcode"}})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.forEach(e=>e()),window.removeEventListener("resize",this.forceUpdate)}render(){return this.onRenderProxy(),u`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["0","xl","xl","xl"]}
        gap="xl"
      >
        <wui-shimmer borderRadius="l" width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

        <wui-text variant="paragraph-500" color="fg-100">
          Scan this QR Code with your phone
        </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;const e=this.getBoundingClientRect().width-40,n=this.wallet?this.wallet.name:void 0;return k.setWcLinking(void 0),k.setRecentWallet(this.wallet),u` <wui-qr-code
      size=${e}
      theme=${sn.state.themeMode}
      uri=${this.uri}
      imageSrc=${j(Y.getWalletImage(this.wallet))}
      color=${j(sn.state.themeVariables["--w3m-qr-color"])}
      alt=${j(n)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`}copyTemplate(){const e=!this.uri||!this.ready;return u`<wui-link
      .disabled=${e}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`}};cn.styles=To;cn=Bo([P("w3m-connecting-wc-qrcode")],cn);var Po=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let ai=class extends U{constructor(){if(super(),this.wallet=V.state.data?.wallet,!this.wallet)throw new Error("w3m-connecting-wc-unsupported: No wallet provided");oe.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}render(){return u`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${j(Y.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="paragraph-500" color="fg-100">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}};ai=Po([P("w3m-connecting-wc-unsupported")],ai);var vi=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let un=class extends G{constructor(){if(super(),this.isLoading=!0,!this.wallet)throw new Error("w3m-connecting-wc-web: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.secondaryBtnLabel="Open",this.secondaryLabel=ui.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.updateLoadingState(),this.unsubscribe.push(k.subscribeKey("wcUri",()=>{this.updateLoadingState()})),oe.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"web"}})}updateLoadingState(){this.isLoading=!this.uri}onConnectProxy(){if(this.wallet?.webapp_link&&this.uri)try{this.error=!1;const{webapp_link:e,name:n}=this.wallet,{redirect:i,href:o}=A.formatUniversalUrl(e,this.uri);k.setWcLinking({name:n,href:o}),k.setRecentWallet(this.wallet),A.openHref(i,"_blank")}catch{this.error=!0}}};vi([B()],un.prototype,"isLoading",void 0);un=vi([P("w3m-connecting-wc-web")],un);var Ze=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let De=class extends U{constructor(){super(),this.wallet=V.state.data?.wallet,this.unsubscribe=[],this.platform=void 0,this.platforms=[],this.isSiwxEnabled=!!ie.state.siwx,this.remoteFeatures=ie.state.remoteFeatures,this.determinePlatforms(),this.initializeConnection(),this.unsubscribe.push(ie.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return u`
      ${this.headerTemplate()}
      <div>${this.platformTemplate()}</div>
      ${this.reownBrandingTemplate()}
    `}reownBrandingTemplate(){return this.remoteFeatures?.reownBranding?u`<wui-ux-by-reown></wui-ux-by-reown>`:null}async initializeConnection(e=!1){if(!(this.platform==="browser"||ie.state.manualWCControl&&!e))try{const{wcPairingExpiry:n,status:i}=k.state;(e||ie.state.enableEmbedded||A.isPairingExpired(n)||i==="connecting")&&(await k.connectWalletConnect(),this.isSiwxEnabled||ci.close())}catch(n){oe.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:n?.message??"Unknown"}}),k.setWcError(!0),it.showError(n.message??"Connection error"),k.resetWcConnection(),V.goBack()}}determinePlatforms(){if(!this.wallet){this.platforms.push("qrcode"),this.platform="qrcode";return}if(this.platform)return;const{mobile_link:e,desktop_link:n,webapp_link:i,injected:o,rdns:t}=this.wallet,a=o?.map(({injected_id:E})=>E).filter(Boolean),s=[...t?[t]:a??[]],l=ie.state.isUniversalProvider?!1:s.length,d=e,h=i,w=k.checkInstalled(s),x=l&&w,p=n&&!A.isMobile();x&&!an.state.noAdapters&&this.platforms.push("browser"),d&&this.platforms.push(A.isMobile()?"mobile":"qrcode"),h&&this.platforms.push("web"),p&&this.platforms.push("desktop"),!x&&l&&!an.state.noAdapters&&this.platforms.push("unsupported"),this.platform=this.platforms[0]}platformTemplate(){switch(this.platform){case"browser":return u`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;case"web":return u`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;case"desktop":return u`
          <w3m-connecting-wc-desktop .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;case"mobile":return u`
          <w3m-connecting-wc-mobile isMobile .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;case"qrcode":return u`<w3m-connecting-wc-qrcode></w3m-connecting-wc-qrcode>`;default:return u`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`}}headerTemplate(){return this.platforms.length>1?u`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `:null}async onSelectPlatform(e){const n=this.shadowRoot?.querySelector("div");n&&(await n.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.platform=e,n.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}};Ze([B()],De.prototype,"platform",void 0);Ze([B()],De.prototype,"platforms",void 0);Ze([B()],De.prototype,"isSiwxEnabled",void 0);Ze([B()],De.prototype,"remoteFeatures",void 0);De=Ze([P("w3m-connecting-wc-view")],De);var yi=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let dn=class extends U{constructor(){super(...arguments),this.isMobile=A.isMobile()}render(){if(this.isMobile){const{featured:e,recommended:n}=z.state,{customWallets:i}=ie.state,o=bt.getRecentWallets(),t=e.length||n.length||i?.length||o.length;return u`<wui-flex
        flexDirection="column"
        gap="xs"
        .margin=${["3xs","s","s","s"]}
      >
        ${t?u`<w3m-connector-list></w3m-connector-list>`:null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`}return u`<wui-flex flexDirection="column" .padding=${["0","0","l","0"]}>
      <w3m-connecting-wc-view></w3m-connecting-wc-view>
      <wui-flex flexDirection="column" .padding=${["0","m","0","m"]}>
        <w3m-all-wallets-widget></w3m-all-wallets-widget> </wui-flex
    ></wui-flex>`}};yi([B()],dn.prototype,"isMobile",void 0);dn=yi([P("w3m-connecting-wc-basic-view")],dn);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const yn=()=>new Lo;class Lo{}const on=new WeakMap,xn=Wi(class extends Si{render(r){return rn}update(r,[e]){const n=e!==this.G;return n&&this.G!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=e,this.ht=r.options?.host,this.rt(this.ct=r.element)),rn}rt(r){if(this.isConnected||(r=void 0),typeof this.G=="function"){const e=this.ht??globalThis;let n=on.get(e);n===void 0&&(n=new WeakMap,on.set(e,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,r),r!==void 0&&this.G.call(this.ht,r)}else this.G.value=r}get lt(){return typeof this.G=="function"?on.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),Oo=q`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 22px;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--wui-color-blue-100);
    border-width: 1px;
    border-style: solid;
    border-color: var(--wui-color-gray-glass-002);
    border-radius: 999px;
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color;
  }

  span:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
    background-color: var(--wui-color-inverse-100);
    transition: transform var(--wui-ease-inout-power-1) var(--wui-duration-lg);
    will-change: transform;
    border-radius: 50%;
  }

  input:checked + span {
    border-color: var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-blue-100);
  }

  input:not(:checked) + span {
    background-color: var(--wui-color-gray-glass-010);
  }

  input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }
`;var xi=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let ft=class extends F{constructor(){super(...arguments),this.inputElementRef=yn(),this.checked=void 0}render(){return I`
      <label>
        <input
          ${xn(this.inputElementRef)}
          type="checkbox"
          ?checked=${we(this.checked)}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `}dispatchChangeEvent(){this.dispatchEvent(new CustomEvent("switchChange",{detail:this.inputElementRef.value?.checked,bubbles:!0,composed:!0}))}};ft.styles=[K,Q,Pi,Oo];xi([c({type:Boolean})],ft.prototype,"checked",void 0);ft=xi([P("wui-switch")],ft);const Ao=q`
  :host {
    height: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: var(--wui-spacing-1xs);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`;var Ci=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let pt=class extends F{constructor(){super(...arguments),this.checked=void 0}render(){return I`
      <button>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-switch ?checked=${we(this.checked)}></wui-switch>
      </button>
    `}};pt.styles=[K,Q,Ao];Ci([c({type:Boolean})],pt.prototype,"checked",void 0);pt=Ci([P("wui-certified-switch")],pt);const jo=q`
  button {
    background-color: var(--wui-color-fg-300);
    border-radius: var(--wui-border-radius-4xs);
    width: 16px;
    height: 16px;
  }

  button:disabled {
    background-color: var(--wui-color-bg-300);
  }

  wui-icon {
    color: var(--wui-color-bg-200) !important;
  }

  button:focus-visible {
    background-color: var(--wui-color-fg-250);
    border: 1px solid var(--wui-color-accent-100);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-fg-250);
    }

    button:active:enabled {
      background-color: var(--wui-color-fg-225);
    }
  }
`;var Ri=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let gt=class extends F{constructor(){super(...arguments),this.icon="copy"}render(){return I`
      <button>
        <wui-icon color="inherit" size="xxs" name=${this.icon}></wui-icon>
      </button>
    `}};gt.styles=[K,Q,jo];Ri([c()],gt.prototype,"icon",void 0);gt=Ri([P("wui-input-element")],gt);const ko=q`
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
    color: var(--wui-color-fg-275);
  }

  input {
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
    color: var(--wui-color-fg-100);
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      box-shadow var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color, box-shadow;
    caret-color: var(--wui-color-accent-100);
  }

  input:disabled {
    cursor: not-allowed;
    border: 1px solid var(--wui-color-gray-glass-010);
  }

  input:disabled::placeholder,
  input:disabled + wui-icon {
    color: var(--wui-color-fg-300);
  }

  input::placeholder {
    color: var(--wui-color-fg-275);
  }

  input:focus:enabled {
    background-color: var(--wui-color-gray-glass-005);
    -webkit-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  input:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px var(--wui-spacing-s);
  }

  wui-icon + .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px 36px;
  }

  wui-icon[data-input='sm'] {
    left: var(--wui-spacing-s);
  }

  .wui-size-md {
    padding: 15px var(--wui-spacing-m) var(--wui-spacing-l) var(--wui-spacing-m);
  }

  wui-icon + .wui-size-md,
  wui-loading-spinner + .wui-size-md {
    padding: 10.5px var(--wui-spacing-3xl) 10.5px var(--wui-spacing-3xl);
  }

  wui-icon[data-input='md'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-lg {
    padding: var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-l);
    letter-spacing: var(--wui-letter-spacing-medium-title);
    font-size: var(--wui-font-size-medium-title);
    font-weight: var(--wui-font-weight-light);
    line-height: 130%;
    color: var(--wui-color-fg-100);
    height: 64px;
  }

  .wui-padding-right-xs {
    padding-right: var(--wui-spacing-xs);
  }

  .wui-padding-right-s {
    padding-right: var(--wui-spacing-s);
  }

  .wui-padding-right-m {
    padding-right: var(--wui-spacing-m);
  }

  .wui-padding-right-l {
    padding-right: var(--wui-spacing-l);
  }

  .wui-padding-right-xl {
    padding-right: var(--wui-spacing-xl);
  }

  .wui-padding-right-2xl {
    padding-right: var(--wui-spacing-2xl);
  }

  .wui-padding-right-3xl {
    padding-right: var(--wui-spacing-3xl);
  }

  .wui-padding-right-4xl {
    padding-right: var(--wui-spacing-4xl);
  }

  .wui-padding-right-5xl {
    padding-right: var(--wui-spacing-5xl);
  }

  wui-icon + .wui-size-lg,
  wui-loading-spinner + .wui-size-lg {
    padding-left: 50px;
  }

  wui-icon[data-input='lg'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-m) 17.25px var(--wui-spacing-m);
  }
  wui-icon + .wui-size-mdl,
  wui-loading-spinner + .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-3xl) 17.25px 40px;
  }
  wui-icon[data-input='mdl'] {
    left: var(--wui-spacing-m);
  }

  input:placeholder-shown ~ ::slotted(wui-input-element),
  input:placeholder-shown ~ ::slotted(wui-icon) {
    opacity: 0;
    pointer-events: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  ::slotted(wui-input-element),
  ::slotted(wui-icon) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  ::slotted(wui-input-element) {
    right: var(--wui-spacing-m);
  }

  ::slotted(wui-icon) {
    right: 0px;
  }
`;var de=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let te=class extends F{constructor(){super(...arguments),this.inputElementRef=yn(),this.size="md",this.disabled=!1,this.placeholder="",this.type="text",this.value=""}render(){const e=`wui-padding-right-${this.inputRightPadding}`,i={[`wui-size-${this.size}`]:!0,[e]:!!this.inputRightPadding};return I`${this.templateIcon()}
      <input
        data-testid="wui-input-text"
        ${xn(this.inputElementRef)}
        class=${Ti(i)}
        type=${this.type}
        enterkeyhint=${we(this.enterKeyHint)}
        ?disabled=${this.disabled}
        placeholder=${this.placeholder}
        @input=${this.dispatchInputChangeEvent.bind(this)}
        .value=${this.value||""}
        tabindex=${we(this.tabIdx)}
      />
      <slot></slot>`}templateIcon(){return this.icon?I`<wui-icon
        data-input=${this.size}
        size=${this.size}
        color="inherit"
        name=${this.icon}
      ></wui-icon>`:null}dispatchInputChangeEvent(){this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value?.value,bubbles:!0,composed:!0}))}};te.styles=[K,Q,ko];de([c()],te.prototype,"size",void 0);de([c()],te.prototype,"icon",void 0);de([c({type:Boolean})],te.prototype,"disabled",void 0);de([c()],te.prototype,"placeholder",void 0);de([c()],te.prototype,"type",void 0);de([c()],te.prototype,"keyHint",void 0);de([c()],te.prototype,"value",void 0);de([c()],te.prototype,"inputRightPadding",void 0);de([c()],te.prototype,"tabIdx",void 0);te=de([P("wui-input-text")],te);const Do=q`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }
`;var zo=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let hn=class extends F{constructor(){super(...arguments),this.inputComponentRef=yn()}render(){return I`
      <wui-input-text
        ${xn(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
      >
        <wui-input-element @click=${this.clearValue} icon="close"></wui-input-element>
      </wui-input-text>
    `}clearValue(){const n=this.inputComponentRef.value?.inputElementRef.value;n&&(n.value="",n.focus(),n.dispatchEvent(new Event("input")))}};hn.styles=[K,Do];hn=zo([P("wui-search-bar")],hn);const No=Ve`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`,Mo=q`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xs) 10px;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--wui-path-network);
    clip-path: var(--wui-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: var(--wui-color-gray-glass-010);
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`;var $i=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let wt=class extends F{constructor(){super(...arguments),this.type="wallet"}render(){return I`
      ${this.shimmerTemplate()}
      <wui-shimmer width="56px" height="20px" borderRadius="xs"></wui-shimmer>
    `}shimmerTemplate(){return this.type==="network"?I` <wui-shimmer
          data-type=${this.type}
          width="48px"
          height="54px"
          borderRadius="xs"
        ></wui-shimmer>
        ${No}`:I`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}};wt.styles=[K,Q,Mo];$i([c()],wt.prototype,"type",void 0);wt=$i([P("wui-card-select-loader")],wt);const Uo=q`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`;var ne=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let J=class extends F{render(){return this.style.cssText=`
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding&&ge.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&ge.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&ge.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&ge.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&ge.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&ge.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&ge.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&ge.getSpacingStyles(this.margin,3)};
    `,I`<slot></slot>`}};J.styles=[K,Uo];ne([c()],J.prototype,"gridTemplateRows",void 0);ne([c()],J.prototype,"gridTemplateColumns",void 0);ne([c()],J.prototype,"justifyItems",void 0);ne([c()],J.prototype,"alignItems",void 0);ne([c()],J.prototype,"justifyContent",void 0);ne([c()],J.prototype,"alignContent",void 0);ne([c()],J.prototype,"columnGap",void 0);ne([c()],J.prototype,"rowGap",void 0);ne([c()],J.prototype,"gap",void 0);ne([c()],J.prototype,"padding",void 0);ne([c()],J.prototype,"margin",void 0);J=ne([P("wui-grid")],J);const qo=Se`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-s) var(--wui-spacing-0);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    transition:
      color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: var(--wui-color-fg-100);
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  button:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  [data-selected='true'] {
    background-color: var(--wui-color-accent-glass-020);
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }
  }

  [data-selected='true']:active:enabled {
    background-color: var(--wui-color-accent-glass-010);
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`;var et=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let We=class extends U{constructor(){super(),this.observer=new IntersectionObserver(()=>{}),this.visible=!1,this.imageSrc=void 0,this.imageLoading=!1,this.wallet=void 0,this.observer=new IntersectionObserver(e=>{e.forEach(n=>{n.isIntersecting?(this.visible=!0,this.fetchImageSrc()):this.visible=!1})},{threshold:.01})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){const e=this.wallet?.badge_type==="certified";return u`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="3xs">
          <wui-text
            variant="tiny-500"
            color="inherit"
            class=${j(e?"certified":void 0)}
            >${this.wallet?.name}</wui-text
          >
          ${e?u`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>`:null}
        </wui-flex>
      </button>
    `}imageTemplate(){return!this.visible&&!this.imageSrc||this.imageLoading?this.shimmerTemplate():u`
      <wui-wallet-image
        size="md"
        imageSrc=${j(this.imageSrc)}
        name=${this.wallet?.name}
        .installed=${this.wallet?.installed}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `}shimmerTemplate(){return u`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}async fetchImageSrc(){this.wallet&&(this.imageSrc=Y.getWalletImage(this.wallet),!this.imageSrc&&(this.imageLoading=!0,this.imageSrc=await Y.fetchWalletImage(this.wallet.image_id),this.imageLoading=!1))}};We.styles=qo;et([B()],We.prototype,"visible",void 0);et([B()],We.prototype,"imageSrc",void 0);et([B()],We.prototype,"imageLoading",void 0);et([M()],We.prototype,"wallet",void 0);We=et([P("w3m-all-wallets-list-item")],We);const Fo=Se`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    justify-content: center;
    grid-column: 1 / span 4;
  }
`;var Ue=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};const si="local-paginator";let Ce=class extends U{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.loading=!z.state.wallets.length,this.wallets=z.state.wallets,this.recommended=z.state.recommended,this.featured=z.state.featured,this.filteredWallets=z.state.filteredWallets,this.unsubscribe.push(z.subscribeKey("wallets",e=>this.wallets=e),z.subscribeKey("recommended",e=>this.recommended=e),z.subscribeKey("featured",e=>this.featured=e),z.subscribeKey("filteredWallets",e=>this.filteredWallets=e))}firstUpdated(){this.initialFetch(),this.createPaginationObserver()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.paginationObserver?.disconnect()}render(){return u`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${["0","s","s","s"]}
        columnGap="xxs"
        rowGap="l"
        justifyContent="space-between"
      >
        ${this.loading?this.shimmerTemplate(16):this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `}async initialFetch(){this.loading=!0;const e=this.shadowRoot?.querySelector("wui-grid");e&&(await z.fetchWalletsByPage({page:1}),await e.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.loading=!1,e.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}shimmerTemplate(e,n){return[...Array(e)].map(()=>u`
        <wui-card-select-loader type="wallet" id=${j(n)}></wui-card-select-loader>
      `)}walletsTemplate(){const e=this.filteredWallets?.length>0?A.uniqueBy([...this.featured,...this.recommended,...this.filteredWallets],"id"):A.uniqueBy([...this.featured,...this.recommended,...this.wallets],"id");return vt.markWalletsAsInstalled(e).map(i=>u`
        <w3m-all-wallets-list-item
          @click=${()=>this.onConnectWallet(i)}
          .wallet=${i}
        ></w3m-all-wallets-list-item>
      `)}paginationLoaderTemplate(){const{wallets:e,recommended:n,featured:i,count:o}=z.state,t=window.innerWidth<352?3:4,a=e.length+n.length;let l=Math.ceil(a/t)*t-a+t;return l-=e.length?i.length%t:0,o===0&&i.length>0?null:o===0||[...i,...e,...n].length<o?this.shimmerTemplate(l,si):null}createPaginationObserver(){const e=this.shadowRoot?.querySelector(`#${si}`);e&&(this.paginationObserver=new IntersectionObserver(([n])=>{if(n?.isIntersecting&&!this.loading){const{page:i,count:o,wallets:t}=z.state;t.length<o&&z.fetchWalletsByPage({page:i+1})}}),this.paginationObserver.observe(e))}onConnectWallet(e){N.selectWalletConnector(e)}};Ce.styles=Fo;Ue([B()],Ce.prototype,"loading",void 0);Ue([B()],Ce.prototype,"wallets",void 0);Ue([B()],Ce.prototype,"recommended",void 0);Ue([B()],Ce.prototype,"featured",void 0);Ue([B()],Ce.prototype,"filteredWallets",void 0);Ce=Ue([P("w3m-all-wallets-list")],Ce);const Vo=Se`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;var It=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let ze=class extends U{constructor(){super(...arguments),this.prevQuery="",this.prevBadge=void 0,this.loading=!0,this.query=""}render(){return this.onSearch(),this.loading?u`<wui-loading-spinner color="accent-100"></wui-loading-spinner>`:this.walletsTemplate()}async onSearch(){(this.query.trim()!==this.prevQuery.trim()||this.badge!==this.prevBadge)&&(this.prevQuery=this.query,this.prevBadge=this.badge,this.loading=!0,await z.searchWallet({search:this.query,badge:this.badge}),this.loading=!1)}walletsTemplate(){const{search:e}=z.state,n=vt.markWalletsAsInstalled(e);return e.length?u`
      <wui-grid
        data-testid="wallet-list"
        .padding=${["0","s","s","s"]}
        rowGap="l"
        columnGap="xs"
        justifyContent="space-between"
      >
        ${n.map(i=>u`
            <w3m-all-wallets-list-item
              @click=${()=>this.onConnectWallet(i)}
              .wallet=${i}
              data-testid="wallet-search-item-${i.id}"
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `:u`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="s"
          flexDirection="column"
        >
          <wui-icon-box
            size="lg"
            iconColor="fg-200"
            backgroundColor="fg-300"
            icon="wallet"
            background="transparent"
          ></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="fg-200" variant="paragraph-500">
            No Wallet found
          </wui-text>
        </wui-flex>
      `}onConnectWallet(e){N.selectWalletConnector(e)}};ze.styles=Vo;It([B()],ze.prototype,"loading",void 0);It([M()],ze.prototype,"query",void 0);It([M()],ze.prototype,"badge",void 0);ze=It([P("w3m-all-wallets-search")],ze);var Cn=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let mt=class extends U{constructor(){super(...arguments),this.search="",this.onDebouncedSearch=A.debounce(e=>{this.search=e})}render(){const e=this.search.length>=2;return u`
      <wui-flex .padding=${["0","s","s","s"]} gap="xs">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${this.badge}
          @click=${this.onClick.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${e||this.badge?u`<w3m-all-wallets-search
            query=${this.search}
            badge=${j(this.badge)}
          ></w3m-all-wallets-search>`:u`<w3m-all-wallets-list badge=${j(this.badge)}></w3m-all-wallets-list>`}
    `}onInputChange(e){this.onDebouncedSearch(e.detail)}onClick(){if(this.badge==="certified"){this.badge=void 0;return}this.badge="certified",it.showSvg("Only WalletConnect certified",{icon:"walletConnectBrown",iconColor:"accent-100"})}qrButtonTemplate(){return A.isMobile()?u`
        <wui-icon-box
          size="lg"
          iconSize="xl"
          iconColor="accent-100"
          backgroundColor="accent-100"
          icon="qrCode"
          background="transparent"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `:null}onWalletConnectQr(){V.push("ConnectingWalletConnect")}};Cn([B()],mt.prototype,"search",void 0);Cn([B()],mt.prototype,"badge",void 0);mt=Cn([P("w3m-all-wallets-view")],mt);const Ko=q`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 11px 18px 11px var(--wui-spacing-s);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
    transition:
      color var(--wui-ease-out-power-1) var(--wui-duration-md),
      background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: color, background-color;
  }

  button[data-iconvariant='square'],
  button[data-iconvariant='square-blue'] {
    padding: 6px 18px 6px 9px;
  }

  button > wui-flex {
    flex: 1;
  }

  button > wui-image {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-3xl);
  }

  button > wui-icon {
    width: 36px;
    height: 36px;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  button > wui-icon-box[data-variant='blue'] {
    box-shadow: 0 0 0 2px var(--wui-color-accent-glass-005);
  }

  button > wui-icon-box[data-variant='overlay'] {
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: var(--wui-border-radius-3xs);
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }

  button > wui-icon-box[data-variant='square-blue']::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-accent-glass-010);
    pointer-events: none;
  }

  button > wui-icon:last-child {
    width: 14px;
    height: 14px;
  }

  button:disabled {
    color: var(--wui-color-gray-glass-020);
  }

  button[data-loading='true'] > wui-icon {
    opacity: 0;
  }

  wui-loading-spinner {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`;var ae=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let Z=class extends F{constructor(){super(...arguments),this.tabIdx=void 0,this.variant="icon",this.disabled=!1,this.imageSrc=void 0,this.alt=void 0,this.chevron=!1,this.loading=!1}render(){return I`
      <button
        ?disabled=${this.loading?!0:!!this.disabled}
        data-loading=${this.loading}
        data-iconvariant=${we(this.iconVariant)}
        tabindex=${we(this.tabIdx)}
      >
        ${this.loadingTemplate()} ${this.visualTemplate()}
        <wui-flex gap="3xs">
          <slot></slot>
        </wui-flex>
        ${this.chevronTemplate()}
      </button>
    `}visualTemplate(){if(this.variant==="image"&&this.imageSrc)return I`<wui-image src=${this.imageSrc} alt=${this.alt??"list item"}></wui-image>`;if(this.iconVariant==="square"&&this.icon&&this.variant==="icon")return I`<wui-icon name=${this.icon}></wui-icon>`;if(this.variant==="icon"&&this.icon&&this.iconVariant){const e=["blue","square-blue"].includes(this.iconVariant)?"accent-100":"fg-200",n=this.iconVariant==="square-blue"?"mdl":"md",i=this.iconSize?this.iconSize:n;return I`
        <wui-icon-box
          data-variant=${this.iconVariant}
          icon=${this.icon}
          iconSize=${i}
          background="transparent"
          iconColor=${e}
          backgroundColor=${e}
          size=${n}
        ></wui-icon-box>
      `}return null}loadingTemplate(){return this.loading?I`<wui-loading-spinner
        data-testid="wui-list-item-loading-spinner"
        color="fg-300"
      ></wui-loading-spinner>`:I``}chevronTemplate(){return this.chevron?I`<wui-icon size="inherit" color="fg-200" name="chevronRight"></wui-icon>`:null}};Z.styles=[K,Q,Ko];ae([c()],Z.prototype,"icon",void 0);ae([c()],Z.prototype,"iconSize",void 0);ae([c()],Z.prototype,"tabIdx",void 0);ae([c()],Z.prototype,"variant",void 0);ae([c()],Z.prototype,"iconVariant",void 0);ae([c({type:Boolean})],Z.prototype,"disabled",void 0);ae([c()],Z.prototype,"imageSrc",void 0);ae([c()],Z.prototype,"alt",void 0);ae([c({type:Boolean})],Z.prototype,"chevron",void 0);ae([c({type:Boolean})],Z.prototype,"loading",void 0);Z=ae([P("wui-list-item")],Z);var Ho=function(r,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,n,i);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,n,t):a(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let li=class extends U{constructor(){super(...arguments),this.wallet=V.state.data?.wallet}render(){if(!this.wallet)throw new Error("w3m-downloads-view");return u`
      <wui-flex gap="xs" flexDirection="column" .padding=${["s","s","l","s"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `}chromeTemplate(){return this.wallet?.chrome_store?u`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Chrome Extension</wui-text>
    </wui-list-item>`:null}iosTemplate(){return this.wallet?.app_store?u`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">iOS App</wui-text>
    </wui-list-item>`:null}androidTemplate(){return this.wallet?.play_store?u`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Android App</wui-text>
    </wui-list-item>`:null}homepageTemplate(){return this.wallet?.homepage?u`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="paragraph-500" color="fg-100">Website</wui-text>
      </wui-list-item>
    `:null}onChromeStore(){this.wallet?.chrome_store&&A.openHref(this.wallet.chrome_store,"_blank")}onAppStore(){this.wallet?.app_store&&A.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&A.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&A.openHref(this.wallet.homepage,"_blank")}};li=Ho([P("w3m-downloads-view")],li);export{mt as W3mAllWalletsView,dn as W3mConnectingWcBasicView,li as W3mDownloadsView};
