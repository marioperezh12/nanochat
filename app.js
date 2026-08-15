
    const chatGrid = document.getElementById('chatGrid');
    const newChatBtn = document.getElementById('newChatBtn');
    const columnsWrap = document.getElementById('columnsWrap');
    const columnsToggle = document.getElementById('columnsToggle');
    const minimizedLauncher = document.getElementById('minimizedLauncher');
    const minimizedMenu = document.getElementById('minimizedMenu');
    const minimizedCount = document.getElementById('minimizedCount');
    const sidebarDockedChats = document.getElementById('sidebarDockedChats');
    const mainShell = document.getElementById('mainShell');
    const mainScroll = document.getElementById('mainScroll');
    const scrollUpBtn = document.getElementById('scrollUpBtn');
    const scrollDownBtn = document.getElementById('scrollDownBtn');
    const apiKeyInput = document.getElementById('apiKeyInput');
    const saveKeysBtn = document.getElementById('saveKeysBtn');
    const connectStatus = document.getElementById('connectStatus');
    const keyModalOverlay = document.getElementById('keyModalOverlay');
    const closeKeyModalBtn = document.getElementById('closeKeyModalBtn');
    const workspaceSettings = document.getElementById('workspaceSettings');
    const settingsToggle = document.getElementById('settingsToggle');
    const favoritesWrap = document.getElementById('favoritesWrap');
    const favoritesToggle = document.getElementById('favoritesToggle');
    const favoritesMenu = document.getElementById('favoritesMenu');
    const workspaceFavToggle = document.getElementById('workspaceFavToggle');
    const workspaceModeWrap = document.getElementById('workspaceModeWrap');
    const workspaceSettingsToggle = document.getElementById('workspaceSettingsToggle');
    const workspaceModeMenu = document.getElementById('workspaceModeMenu');
    const workspaceThreeSection = document.getElementById('workspaceThreeSection');
    const workspaceThreeCloseBtn = document.getElementById('workspaceThreeCloseBtn');
    const workspaceThreeStage = document.getElementById('workspaceThreeStage');
    const workspaceThreeCanvas = document.getElementById('workspaceThreeCanvas');
    const workspaceThreeChat = document.getElementById('workspaceThreeChat');
    const workspaceThreeChatTwo = document.getElementById('workspaceThreeChatTwo');
    const workspaceThreeChatBody = document.getElementById('workspaceThreeChatBody');
    const workspaceThreeChatInput = document.getElementById('workspaceThreeChatInput');
    const workspaceThreeChatSend = document.getElementById('workspaceThreeChatSend');
    const workspaceThreeChatBodyTwo = document.getElementById('workspaceThreeChatBodyTwo');
    const workspaceThreeChatInputTwo = document.getElementById('workspaceThreeChatInputTwo');
    const workspaceThreeChatSendTwo = document.getElementById('workspaceThreeChatSendTwo');
    const panzoomZoomOutBtn = document.getElementById('panzoomZoomOutBtn');
    const panzoomResetBtn = document.getElementById('panzoomResetBtn');
    const panzoomZoomInBtn = document.getElementById('panzoomZoomInBtn');
    const workspaceThreeMaxBtn = document.getElementById('workspaceThreeMaxBtn');
    let workspaceThreePanzoom = null;
    let workspaceThreeJsPlumb = null;
    let workspaceThreeConnection = null;
    const workspaceThreeConnections = [];
    const workspaceThreeMiniChats = [];
    let workspaceThreeMaximized = false;
    let workspaceThreeVisible = false;
    let activeWorkspaceThreeChatId = null;
    let workspaceThreeZIndexCounter = 10;
    const newChatMenuItem = document.getElementById('newChatMenuItem');
    const setKeyMenuItem = document.getElementById('setKeyMenuItem');
    const importChatMenuItem = document.getElementById('importChatMenuItem');
    const importModalOverlay = document.getElementById('importModalOverlay');
    const importFileInput = document.getElementById('importFileInput');
    const importTextarea = document.getElementById('importTextarea');
    const loadImportBtn = document.getElementById('loadImportBtn');
    const closeImportModalBtn = document.getElementById('closeImportModalBtn');
    const importStatus = document.getElementById('importStatus');
    const privacyMenuItem = document.getElementById('privacyMenuItem');
    const privacyModalOverlay = document.getElementById('privacyModalOverlay');
    const privacyPasswordInput = document.getElementById('privacyPasswordInput');
    const privacyPasswordConfirm = document.getElementById('privacyPasswordConfirm');
    const savePrivacyPasswordBtn = document.getElementById('savePrivacyPasswordBtn');
    const closePrivacyModalBtn = document.getElementById('closePrivacyModalBtn');
    const privacyModalStatus = document.getElementById('privacyModalStatus');
    const connectionProfilesMenuItem = document.getElementById('connectionProfilesMenuItem');
    const connectionProfilesModalOverlay = document.getElementById('connectionProfilesModalOverlay');
    const connectionProfilesJsonInput = document.getElementById('connectionProfilesJsonInput');
    const connectionProfilesSaveBtn = document.getElementById('connectionProfilesSaveBtn');
    const connectionProfilesStatus = document.getElementById('connectionProfilesStatus');
    const appEl = document.querySelector('.app');
    const sidebar = document.getElementById('sidebar');
    const sidebarList = document.getElementById('sidebarList');
    const sidebarDropZone = document.getElementById('sidebarDropZone');
    const sidebarResizeHandle = document.getElementById('sidebarResizeHandle');
    const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
    const footerToggleBtn = document.getElementById('footerToggleBtn');
    const userMenu = document.getElementById('userMenu');
    const userBadge = document.getElementById('userBadge');
    const userDropdownName = document.getElementById('userDropdownName');
    const userDropdownEmail = document.getElementById('userDropdownEmail');
    const logoutBtn = document.getElementById('logoutBtn');
    const engineSelect = document.getElementById('engineSelect');
    const geminiApiKeyInput = document.getElementById('geminiApiKeyInput');
    const groqApiKeyInput = document.getElementById('groqApiKeyInput');
    const deepseekApiKeyInput = document.getElementById('deepseekApiKeyInput');
    const AUTH_STORAGE_KEY = 'nanochat_auth_user';

    let chatState = [];
    let chatGridColumns = 3;
    let closeTimer = null;
    let openAiApiKey = '';
    let geminiApiKey = '';
    let groqApiKey = '';
    let deepseekApiKey = '';
    let pendingPrivacyChatId = null;
    let pendingWorkspaceThreePrivacyChatId = null;
    let userCryptoKey = null;
    let selectedEngine = 'openai';
    const scrollOverrides = {};

    const STORAGE_PREFIX = 'nanochat_chat_';
    const API_KEY_STORAGE = 'nanochat_openai_key';
    const GEMINI_API_KEY_STORAGE = 'nanochat_gemini_key';
    const GROQ_API_KEY_STORAGE = 'nanochat_groq_key';
    const DEEPSEEK_API_KEY_STORAGE = 'nanochat_deepseek_key';
    const ENGINE_STORAGE = 'nanochat_engine';
    const CHAT_ORDER_STORAGE = 'nanochat_order';
    const GRID_COLUMNS_STORAGE = 'nanochat_grid_columns';
    const SIDEBAR_WIDTH_STORAGE = 'nanochat_sidebar_width';
    const WORKSPACE_THREE_STORAGE = 'nanochat_workspace_three';
    const TEMPORAL_MESSAGE_TTL = 120000;
    const PRIVACY_PASSWORD_STORAGE = 'nanochat_privacy_password';
    const CONNECTION_PROFILES_STORAGE = 'nanochat_connection_profiles';
    const CRYPTO_SALT = 'nanochat-local-salt-v1';
    let restoringWorkspaceThree = false;
    async function deriveUserCryptoKey(sub) {
      if (!sub || !window.crypto || !window.crypto.subtle) return null;
      const enc = new TextEncoder();
      const keyMaterial = await crypto.subtle.importKey(
        'raw', enc.encode(sub), { name: 'PBKDF2' }, false, ['deriveKey']
      );
      return crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt: enc.encode(CRYPTO_SALT), iterations: 100000, hash: 'SHA-256' },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
      );
    }

    async function encryptWithKey(key, plaintext) {
      if (!key) return plaintext;
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const enc = new TextEncoder();
      const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(plaintext));
      const combined = new Uint8Array(iv.length + ciphertext.byteLength);
      combined.set(iv, 0);
      combined.set(new Uint8Array(ciphertext), iv.length);
      let binary = '';
      combined.forEach((byte) => { binary += String.fromCharCode(byte); });
      return 'enc:' + btoa(binary);
    }

    async function decryptWithKey(key, stored) {
      if (!stored) return '';
      if (stored.indexOf('enc:') !== 0) return stored;
      if (!key) return '';
      try {
        const binary = atob(stored.slice(4));
        const combined = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) combined[i] = binary.charCodeAt(i);
        const iv = combined.slice(0, 12);
        const data = combined.slice(12);
        const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
        return new TextDecoder().decode(plaintext);
      } catch (error) {
        return '';
      }
    }

    function encryptForUser(plaintext) {
      return encryptWithKey(userCryptoKey, plaintext);
    }

    function decryptForUser(stored) {
      return decryptWithKey(userCryptoKey, stored);
    }

    let privacyContentKeyCache = null;

    async function getPrivacyContentKey() {
      const pw = await loadPrivacyPassword();
      if (!pw) return null;
      if (privacyContentKeyCache && privacyContentKeyCache.password === pw) {
        return privacyContentKeyCache.key;
      }
      const enc = new TextEncoder();
      const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(pw), { name: 'PBKDF2' }, false, ['deriveKey']);
      const key = await crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt: enc.encode('nanochat-privacy-content-salt-v1'), iterations: 100000, hash: 'SHA-256' },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
      );
      privacyContentKeyCache = { password: pw, key };
      return key;
    }

    function storageKey(name) {
      return STORAGE_PREFIX + name;
    }

    function createPersistentChatId() {
      if (window.crypto && typeof window.crypto.randomUUID === 'function') {
        return window.crypto.randomUUID();
      }
      return 'chat-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);
    }

    function getChatByName(name) {
      if (!name) return null;
      return chatState.find(chat => chat.name === name) || null;
    }

    function syncWorkspaceThreeOwnerState(state) {
      if (!state) return;
      const ownerFromId = state.ownerChatId ? chatState.find(chat => chat.id === state.ownerChatId) : null;
      const ownerFromName = state.ownerChatName ? getChatByName(state.ownerChatName) : null;
      const ownerChat = ownerFromName || ownerFromId || null;
      state.ownerChatId = ownerChat ? ownerChat.id : null;
      state.ownerChatName = ownerChat ? ownerChat.name : (state.ownerChatName || null);
    }

    function getWorkspaceThreeOwnerChatName(state) {
      syncWorkspaceThreeOwnerState(state);
      return state?.ownerChatName || null;
    }

    function syncWorkspaceThreeBranchFlags() {
      const ownerNames = new Set(
        workspaceThreeMiniChats
          .filter(state => !(String(state?.id || '').indexOf('workspace-three-chat-current-') === 0))
          .map(state => getWorkspaceThreeOwnerChatName(state))
          .filter(Boolean)
      );
      chatState.forEach(chat => {
        chat.hasBranches = ownerNames.has(chat.name);
      });
    }

    function serializeWorkspaceThreeMessage(message) {
      if (!message) return null;
      const expiresAt = Number(message.expiresAt);
      return {
        id: Number.isFinite(Number(message.id)) ? Number(message.id) : null,
        role: message.role || 'assistant',
        text: String(message.text || ''),
        display: message.display || null,
        isSummary: Boolean(message.isSummary),
        expiresAt: Number.isFinite(expiresAt) && expiresAt > Date.now() ? expiresAt : null
      };
    }

    function serializeWorkspaceThreeMiniChat(state) {
      syncWorkspaceThreeOwnerState(state);
      const x = Number(state.element?.dataset?.x || 0);
      const y = Number(state.element?.dataset?.y || 0);
      return {
        id: state.id,
        name: state.name || state.titleStrong?.textContent || 'Workspace Three',
        title: state.titleStrong?.textContent || state.name || 'Workspace Three',
        subtitle: state.titleSpan?.textContent || '',
        assistantPrefix: state.assistantPrefix || '',
        x: Number.isFinite(x) ? x : 0,
        y: Number.isFinite(y) ? y : 0,
        inputPlaceholder: state.input?.placeholder || 'Escribe un mensaje...',
        favorite: Boolean(state.favorite),
        isPrivate: Boolean(state.isPrivate),
        temporalMode: Boolean(state.temporalMode),
        minimized: Boolean(state.minimized),
        maximized: Boolean(state.maximized),
        closed: Boolean(state.closed),
        ownerChatName: state.ownerChatName || null,
        zIndex: Number(state.zIndex) || 1,
        pinnedMessageIds: Array.isArray(state.pinnedMessageIds) ? state.pinnedMessageIds.slice() : [],
        versions: Array.isArray(state.versions) ? state.versions : [],
        viewingVersionId: state.viewingVersionId || null,
        currentSourceLabel: state.currentSourceLabel || null,
        contextMessage: state.contextMessage && state.contextMessage.rawText
          ? {
            rawText: state.contextMessage.rawText,
            display: state.contextMessage.display || formatWorkspaceThreeContextHtml(state.contextMessage.rawText)
          }
          : null,
        messages: state.messages
          .map(serializeWorkspaceThreeMessage)
          .filter(Boolean),
        nextMessageId: Number(state.nextMessageId) || 0
      };
    }

    function saveWorkspaceThreeToStorage() {
      if (restoringWorkspaceThree) return;
      try {
        if (!workspaceThreeMiniChats.length) {
          localStorage.removeItem(WORKSPACE_THREE_STORAGE);
          return;
        }
        const activeChat = activeWorkspaceThreeChatId
          ? chatState.find(chat => chat.id === activeWorkspaceThreeChatId)
          : null;
        const payload = {
          visible: Boolean(workspaceThreeVisible),
          maximized: Boolean(workspaceThreeMaximized),
          activeOwnerChatName: activeChat ? activeChat.name : null,
          chats: workspaceThreeMiniChats.map(serializeWorkspaceThreeMiniChat),
          connections: workspaceThreeConnections
            .map(connection => ({
              sourceId: connection?._workspaceThreeSourceState?.id || null,
              targetId: connection?._workspaceThreeTargetState?.id || null
            }))
            .filter(connection => connection.sourceId && connection.targetId)
        };
        localStorage.setItem(WORKSPACE_THREE_STORAGE, JSON.stringify(payload));
      } catch (error) { }
    }

    function loadWorkspaceThreeFromStorage() {
      try {
        const raw = localStorage.getItem(WORKSPACE_THREE_STORAGE);
        const parsed = raw ? JSON.parse(raw) : null;
        if (!parsed || !Array.isArray(parsed.chats)) return null;
        return parsed;
      } catch (error) {
        return null;
      }
    }

    function updateWorkspaceThreeOwnerName(oldName, newName) {
      if (!oldName || !newName || oldName === newName) return;
      workspaceThreeMiniChats.forEach(state => {
        if (state.ownerChatName !== oldName) return;
        state.ownerChatName = newName;
        const currentTitle = state.titleStrong?.textContent || '';
        const currentSubtitle = state.titleSpan?.textContent || '';
        if (currentTitle === 'Ramas de ' + oldName && state.titleStrong) {
          state.titleStrong.textContent = 'Ramas de ' + newName;
        }
        if (currentSubtitle === oldName && state.titleSpan) {
          state.titleSpan.textContent = newName;
        }
        if (state.name === 'Ramas de ' + oldName) {
          state.name = 'Ramas de ' + newName;
        }
      });
      syncWorkspaceThreeBranchFlags();
      saveWorkspaceThreeToStorage();
    }

    function removeWorkspaceThreeBranchesForOwner(ownerName) {
      if (!ownerName) return;
      const branchStates = workspaceThreeMiniChats.filter(state => state.ownerChatName === ownerName);
      if (!branchStates.length) return;
      branchStates.forEach(state => {
        disconnectWorkspaceThreeState(state);
        if (state.element?.parentNode) {
          state.element.parentNode.removeChild(state.element);
        }
        const index = workspaceThreeMiniChats.indexOf(state);
        if (index !== -1) workspaceThreeMiniChats.splice(index, 1);
      });
      const activeChat = activeWorkspaceThreeChatId
        ? chatState.find(chat => chat.id === activeWorkspaceThreeChatId)
        : null;
      if (activeChat && activeChat.name === ownerName) {
        activeWorkspaceThreeChatId = null;
        workspaceThreeVisible = false;
        if (workspaceThreeMaximized) {
          setWorkspaceThreeMaximized(false);
        }
      }
      syncWorkspaceThreeBranchFlags();
      refreshWorkspaceThreeConnection();
      saveWorkspaceThreeToStorage();
    }

    async function saveChatToStorage(chat) {
      try {
        const chatStorageId = chat.storageId || chat.name || '';
        const powerShellLines = Array.isArray(chat._powerShellLines)
          ? chat._powerShellLines
              .filter(line => line && typeof line.text === 'string')
              .map(line => ({
                kind: line.kind === 'command' ? 'command' : 'output',
                prefix: line.prefix === 'PS> ' ? 'PS> ' : '',
                text: String(line.text || '')
              }))
          : [];
        const folderSelection = chat.folderSelection ? {
          name: chat.folderSelection.name || '',
          fileCount: Number(chat.folderSelection.fileCount) || 0,
          selectedAt: Number(chat.folderSelection.selectedAt) || Date.now()
        } : null;
        if (chat.isPrivate) {
          if (chat._encryptedMessages && !chat.unlocked) {
            // Still locked and never decrypted this session: re-write the existing
            // ciphertext as-is instead of deriving from chat.messages (which is empty
            // while locked) so renames/favorites don't wipe the content.
            localStorage.setItem(storageKey(chat.name), JSON.stringify({
              name: chat.name,
              encryptedMessages: chat._encryptedMessages,
              pinnedIndices: Array.isArray(chat.pinnedIndices) ? chat.pinnedIndices : [],
              expandedIndices: Array.isArray(chat.expandedIndices) ? chat.expandedIndices : [],
              favorite: Boolean(chat.favorite),
              revealedOlderCount: Number(chat.revealedOlderCount) || 0,
              versions: Array.isArray(chat.versions) ? chat.versions : [],
              currentSourceLabel: chat.currentSourceLabel || null,
              contextMessage: chat.contextMessage || null,
              folderSelection,
              folderPanelOpen: Boolean(chat.folderPanelOpen),
              folderPreviewPath: chat.folderPreviewPath || null,
              pinnedFileContext: chat.pinnedFileContext || null,
              powerShellLines,
              storageId: chatStorageId,
              positionIndex: Number.isFinite(chat.positionIndex) ? chat.positionIndex : null,
              docked: Boolean(chat.docked),
              temporalMode: Boolean(chat.temporalMode),
              hasBranches: Boolean(chat.hasBranches),
              isPrivate: true
            }));
            return;
          }
          const key = await getPrivacyContentKey();
          if (!key) return;
          const plaintext = JSON.stringify(chat.messages.filter(message => !message.typing));
          const encryptedMessages = await encryptWithKey(key, plaintext);
            localStorage.setItem(storageKey(chat.name), JSON.stringify({
              name: chat.name,
              encryptedMessages,
              pinnedIndices: Array.isArray(chat.pinnedIndices) ? chat.pinnedIndices : [],
              expandedIndices: Array.isArray(chat.expandedIndices) ? chat.expandedIndices : [],
            favorite: Boolean(chat.favorite),
            revealedOlderCount: Number(chat.revealedOlderCount) || 0,
            versions: Array.isArray(chat.versions) ? chat.versions : [],
            currentSourceLabel: chat.currentSourceLabel || null,
            contextMessage: chat.contextMessage || null,
            folderSelection,
            folderPanelOpen: Boolean(chat.folderPanelOpen),
            folderPreviewPath: chat.folderPreviewPath || null,
            pinnedFileContext: chat.pinnedFileContext || null,
            powerShellLines,
            storageId: chatStorageId,
            positionIndex: Number.isFinite(chat.positionIndex) ? chat.positionIndex : null,
            docked: Boolean(chat.docked),
            temporalMode: Boolean(chat.temporalMode),
            hasBranches: Boolean(chat.hasBranches),
            isPrivate: true
            }));
          return;
        }
        localStorage.setItem(storageKey(chat.name), JSON.stringify({
          name: chat.name,
          messages: chat.messages.filter(message => !message.typing),
          pinnedIndices: Array.isArray(chat.pinnedIndices) ? chat.pinnedIndices : [],
          expandedIndices: Array.isArray(chat.expandedIndices) ? chat.expandedIndices : [],
          favorite: Boolean(chat.favorite),
          revealedOlderCount: Number(chat.revealedOlderCount) || 0,
          versions: Array.isArray(chat.versions) ? chat.versions : [],
          currentSourceLabel: chat.currentSourceLabel || null,
          contextMessage: chat.contextMessage || null,
          folderSelection,
          folderPanelOpen: Boolean(chat.folderPanelOpen),
          folderPreviewPath: chat.folderPreviewPath || null,
          pinnedFileContext: chat.pinnedFileContext || null,
          powerShellLines,
          storageId: chatStorageId,
          positionIndex: Number.isFinite(chat.positionIndex) ? chat.positionIndex : null,
          docked: Boolean(chat.docked),
          temporalMode: Boolean(chat.temporalMode),
          hasBranches: Boolean(chat.hasBranches),
          isPrivate: false
        }));
      } catch (error) { }
    }

    function removeChatFromStorage(name) {
      try {
        localStorage.removeItem(storageKey(name));
      } catch (error) { }
    }

    function loadChatsFromStorage() {
      const chats = [];
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (!key || !key.startsWith(STORAGE_PREFIX)) continue;
          const raw = localStorage.getItem(key);
          if (!raw) continue;
          const parsed = JSON.parse(raw);
          if (parsed && parsed.name) chats.push(parsed);
        }
      } catch (error) { }
      return chats;
    }

    function saveChatOrder() {
      try {
        localStorage.setItem(CHAT_ORDER_STORAGE, JSON.stringify(chatState.map((item, index) => ({
          name: item.name,
          positionIndex: index
        }))));
      } catch (error) { }
    }

    function loadChatOrder() {
      try {
        const raw = localStorage.getItem(CHAT_ORDER_STORAGE);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        return [];
      }
    }

    function isTemporalMessageExpired(message) {
      return Boolean(message && message.expiresAt && message.expiresAt <= Date.now());
    }

    function syncChatPositions() {
      chatState.forEach((chat, index) => {
        chat.positionIndex = index;
      });
    }

    function clearAllChatsFromStorage() {
      try {
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith(STORAGE_PREFIX)) keys.push(key);
        }
        keys.forEach(key => localStorage.removeItem(key));
        localStorage.removeItem(WORKSPACE_THREE_STORAGE);
      } catch (error) { }
    }

    async function loadSavedApiKey() {
      try {
        const raw = localStorage.getItem(API_KEY_STORAGE) || '';
        return await decryptForUser(raw);
      } catch (error) {
        return '';
      }
    }

    async function saveApiKey(key) {
      try {
        localStorage.setItem(API_KEY_STORAGE, await encryptForUser(key));
      } catch (error) { }
    }

    async function loadSavedGeminiApiKey() {
      try {
        const raw = localStorage.getItem(GEMINI_API_KEY_STORAGE) || '';
        return await decryptForUser(raw);
      } catch (error) {
        return '';
      }
    }

    async function saveGeminiApiKey(key) {
      try {
        localStorage.setItem(GEMINI_API_KEY_STORAGE, await encryptForUser(key));
      } catch (error) { }
    }

    async function loadSavedGroqApiKey() {
      try {
        const raw = localStorage.getItem(GROQ_API_KEY_STORAGE) || '';
        return await decryptForUser(raw);
      } catch (error) {
        return '';
      }
    }

    async function saveGroqApiKey(key) {
      try {
        localStorage.setItem(GROQ_API_KEY_STORAGE, await encryptForUser(key));
      } catch (error) { }
    }

    async function loadSavedDeepSeekApiKey() {
      try {
        const raw = localStorage.getItem(DEEPSEEK_API_KEY_STORAGE) || '';
        return await decryptForUser(raw);
      } catch (error) {
        return '';
      }
    }

    async function saveDeepSeekApiKey(key) {
      try {
        localStorage.setItem(DEEPSEEK_API_KEY_STORAGE, await encryptForUser(key));
      } catch (error) { }
    }

    function hasPrivacyPassword() {
      try {
        return !!localStorage.getItem(PRIVACY_PASSWORD_STORAGE);
      } catch (error) {
        return false;
      }
    }

    async function loadPrivacyPassword() {
      try {
        const raw = localStorage.getItem(PRIVACY_PASSWORD_STORAGE) || '';
        return await decryptForUser(raw);
      } catch (error) {
        return '';
      }
    }

    async function savePrivacyPassword(password) {
      try {
        localStorage.setItem(PRIVACY_PASSWORD_STORAGE, await encryptForUser(password));
      } catch (error) { }
    }

    function openConnectionProfilesModal() {
      const raw = localStorage.getItem(CONNECTION_PROFILES_STORAGE) || '[]';
      if (connectionProfilesJsonInput) {
        try {
          connectionProfilesJsonInput.value = JSON.stringify(JSON.parse(raw), null, 2);
        } catch (error) {
          connectionProfilesJsonInput.value = raw;
        }
      }
      if (connectionProfilesStatus) connectionProfilesStatus.textContent = '';
      connectionProfilesModalOverlay.hidden = false;
      connectionProfilesJsonInput?.focus();
    }

    function closeConnectionProfilesModal() {
      connectionProfilesModalOverlay.hidden = true;
    }

    async function saveConnectionProfileFromPanel() {
      if (!connectionProfilesJsonInput) return;
      const raw = connectionProfilesJsonInput.value.trim();
      if (!raw) {
        connectionProfilesStatus.textContent = 'Pega un JSON válido.';
        return;
      }
      try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
          connectionProfilesStatus.textContent = 'El JSON debe ser una lista de perfiles.';
          return;
        }
        localStorage.setItem(CONNECTION_PROFILES_STORAGE, JSON.stringify(parsed, null, 2));
        connectionProfilesStatus.textContent = 'Guardado.';
      } catch (error) {
        connectionProfilesStatus.textContent = 'JSON inválido.';
      }
    }

    function openPrivacyPasswordModal() {
      privacyPasswordInput.value = '';
      privacyPasswordConfirm.value = '';
      privacyModalStatus.textContent = '';
      privacyModalOverlay.hidden = false;
      privacyPasswordInput.focus();
    }

    function closePrivacyPasswordModal() {
      privacyModalOverlay.hidden = true;
      pendingPrivacyChatId = null;
      pendingWorkspaceThreePrivacyChatId = null;
    }

    async function savePrivacyPasswordFromModal() {
      const pw = privacyPasswordInput.value;
      const confirmPw = privacyPasswordConfirm.value;
      if (!pw) {
        privacyModalStatus.textContent = 'Ingresa una contraseña.';
        return;
      }
      if (pw !== confirmPw) {
        privacyModalStatus.textContent = 'Las contraseñas no coinciden.';
        return;
      }
      await savePrivacyPassword(pw);
      if (pendingPrivacyChatId) {
        const chat = chatState.find(item => item.id === pendingPrivacyChatId);
        if (chat) {
          chat.isPrivate = true;
          chat.unlocked = false;
          await saveChatToStorage(chat);
        }
      }
      pendingPrivacyChatId = null;
      if (pendingWorkspaceThreePrivacyChatId) {
        const workspaceThreeMiniChat = workspaceThreeMiniChats.find(item => item.id === pendingWorkspaceThreePrivacyChatId);
        if (workspaceThreeMiniChat) {
          workspaceThreeMiniChat.isPrivate = true;
          workspaceThreeMiniChat.unlocked = false;
          renderWorkspaceThreeMiniChat(workspaceThreeMiniChat);
        }
      }
      pendingWorkspaceThreePrivacyChatId = null;
      privacyModalOverlay.hidden = true;
      renderChats();
    }

    function openKeyModal() {
      apiKeyInput.value = openAiApiKey || '';
      geminiApiKeyInput.value = geminiApiKey || '';
      groqApiKeyInput.value = groqApiKey || '';
      deepseekApiKeyInput.value = deepseekApiKey || '';
      connectStatus.textContent = '';
      keyModalOverlay.hidden = false;
      apiKeyInput.focus();
    }

    function closeKeyModal() {
      keyModalOverlay.hidden = true;
    }

    function generateUniqueChatName() {
      let n = chatState.length + 1;
      let name = `Chat ${n}`;
      while (chatState.some(item => item.name === name)) {
        n++;
        name = `Chat ${n}`;
      }
      return name;
    }

    function generateUniqueBranchChatName(sourceName = '') {
      const baseName = 'Branch - ' + String(sourceName || 'Chat').trim();
      let name = baseName;
      let counter = 2;
      while (chatState.some(item => item.name === name)) {
        name = baseName + ' (' + counter + ')';
        counter += 1;
      }
      return name;
    }

    function createBaseChatState(overrides = {}) {
      return {
        id: `chat-${Date.now()}-${chatState.length}`,
        name: generateUniqueChatName(),
        minimized: false,
        docked: false,
        maximized: false,
        closing: false,
        deleted: false,
        focused: true,
        blinked: true,
        messages: [],
        attachment: null,
        editingIndex: null,
        responseMode: 'short',
        pinnedIndices: [],
        expandedIndices: [],
        flashHighlight: false,
        replyingToIndex: null,
        favorite: false,
        isPrivate: false,
        unlocked: false,
        revealedOlderCount: 0,
        versions: [],
        viewingVersionId: null,
        currentSourceLabel: null,
        contextMessage: null,
        statusMessage: null,
        consoleShowVersions: false,
        consoleShowDelete: false,
        temporalMode: false,
        hasBranches: false,
        storageId: createPersistentChatId(),
        pinnedFileContext: null,
        folderSelection: null,
        folderPanelOpen: false,
        folderPreviewPath: null,
        ...overrides
      };
    }

    function addChatToState(chat) {
      chatState.forEach(item => { item.focused = false; });
      chatState.unshift(chat);
      syncChatPositions();
      saveChatToStorage(chat);
      saveChatOrder();
      renderChats();
      setTimeout(() => {
        chat.blinked = false;
        renderChats();
      }, 900);
      return chat;
    }

    function addNewChat() {
      const chat = createBaseChatState();
      addChatToState(chat);
    }

    function cloneChatStateValue(value) {
      if (value == null) return value;
      try {
        return JSON.parse(JSON.stringify(value));
      } catch (error) {
        return value;
      }
    }

    function createBranchChatFromSource(sourceChat, options = {}) {
      const branchChat = createBaseChatState({
        name: options.name || generateUniqueBranchChatName(),
        messages: Array.isArray(sourceChat?.messages) ? sourceChat.messages.map(item => cloneChatStateValue(item)) : [],
        responseMode: sourceChat?.responseMode || 'short',
        pinnedIndices: Array.isArray(sourceChat?.pinnedIndices) ? sourceChat.pinnedIndices.slice() : [],
        expandedIndices: Array.isArray(sourceChat?.expandedIndices) ? sourceChat.expandedIndices.slice() : [],
        contextMessage: cloneChatStateValue(sourceChat?.contextMessage || null),
        pinnedFileContext: cloneChatStateValue(sourceChat?.pinnedFileContext || null),
        folderSelection: cloneChatStateValue(sourceChat?.folderSelection || null),
        folderPanelOpen: false,
        folderPreviewPath: null
      });
      return addChatToState(branchChat);
    }

    async function handleChatFolderAction(chatId, options = {}) {
      const chat = chatState.find(item => item.id === chatId);
      if (!chat) return;
      const folderBrowser = window.nanochatFolderBrowser;
      if (!folderBrowser || typeof folderBrowser.selectDirectory !== 'function') return;

      const selection = await folderBrowser.selectDirectory({ startIn: options.startIn || 'documents' });
      if (!selection) return;
      chat.folderSelection = selection;
      chat.folderPanelOpen = true;
      chat.folderPreviewPath = null;
      await saveChatToStorage(chat);
      if (typeof folderBrowser.rememberDirectorySelection === 'function') {
        await folderBrowser.rememberDirectorySelection(storageKey(chat.storageId || chat.name), selection);
      }
      renderChats();
    }

    function getChatFolderFileEntries(chat) {
      const tree = chat?.folderSelection?.tree;
      if (!tree) return [];
      const folderBrowser = window.nanochatFolderBrowser;
      if (folderBrowser && typeof folderBrowser.flattenFiles === 'function') {
        return folderBrowser.flattenFiles(tree);
      }
      const entries = [];
      const walk = (node) => {
        if (!node) return;
        if (node.type === 'file') {
          entries.push({
            name: node.name || 'archivo',
            path: node.path || node.name || 'archivo',
            size: Number(node.size) || 0
          });
          return;
        }
        if (Array.isArray(node.children)) {
          node.children.forEach(walk);
        }
      };
      walk(tree);
      return entries;
    }

    function isPreviewableFolderFileName(name) {
      return /\.(txt|sql|json|ps1|ts|js|css)$/i.test(String(name || '')); 
    }

    function findFolderTreeFileNode(node, path) {
      if (!node || !path) return null;
      if (node.type === 'file' && node.path === path) return node;
      if (!Array.isArray(node.children)) return null;
      for (const child of node.children) {
        const found = findFolderTreeFileNode(child, path);
        if (found) return found;
      }
      return null;
    }

    function findFolderTreeFolderNode(node, path) {
      if (!node || !path) return null;
      if (node.type === 'folder' && node.path === path) return node;
      if (!Array.isArray(node.children)) return null;
      for (const child of node.children) {
        const found = findFolderTreeFolderNode(child, path);
        if (found) return found;
      }
      return null;
    }

    function renderFolderFilePreviewHtml(fileNode) {
      if (!fileNode || fileNode.type !== 'file') return '';
      const content = String(fileNode.content || '');
      const title = escapeHtml(fileNode.path || fileNode.name || 'archivo');
      const sizeLabel = escapeHtml(((Number(fileNode.size) || 0) + ' bytes'));
      return '<div class="folder-file-preview">'
        + '<div class="folder-file-preview-head">'
        + '<div class="folder-file-preview-title">'
        + '<button type="button" class="folder-preview-close-btn folder-preview-back-icon-btn" title="Volver al árbol" aria-label="Volver al árbol">&#x21A9;</button>'
        + '<span class="folder-file-preview-title-text">' + title + '</span>'
        + '</div>'
        + '<div class="folder-file-preview-meta">' + sizeLabel + '</div>'
        + '</div>'
        + '<pre class="folder-file-preview-content">' + escapeHtml(content || 'Archivo vacío.') + '</pre>'
        + '</div>';
    }

    function renderFolderPreviewPanelHtml(chat) {
      const previewPath = chat?.folderPreviewPath || null;
      const previewNode = chat?.folderSelection && previewPath
        ? findFolderTreeFileNode(chat.folderSelection.tree, previewPath)
        : null;
      let bodyHtml = '';

      if (chat?.folderPreviewLoading) {
        bodyHtml = '<div class="folder-preview-loading">Cargando contenido del archivo...</div>';
      } else if (chat?.folderPreviewError) {
        bodyHtml = '<div class="folder-preview-error">' + escapeHtml(chat.folderPreviewError) + '</div>';
      } else if (previewNode && isPreviewableFolderFileName(previewNode.name) && typeof previewNode.content === 'string') {
        bodyHtml = renderFolderFilePreviewHtml(previewNode);
      } else if (previewNode && isPreviewableFolderFileName(previewNode.name)) {
        bodyHtml = '<div class="folder-preview-empty">Haz clic en el archivo para cargar su contenido.</div>';
      } else if (previewPath) {
        bodyHtml = '<div class="folder-preview-empty">Ese tipo de archivo no tiene vista previa.</div>';
      } else {
        bodyHtml = '<div class="folder-preview-empty">Selecciona un archivo .txt, .sql, .json, .ps1, .ts, .js o .css para ver su contenido.</div>';
      }

      return '<div class="folder-preview-body">' + bodyHtml + '</div>';
    }

    function getLiveFolderFileReference(chat, filePath) {
      const selection = chat?.folderSelection || null;
      if (!selection || !filePath) return null;
      if (selection.filesByPath instanceof Map && selection.filesByPath.has(filePath)) {
        return selection.filesByPath.get(filePath);
      }
      const tree = selection.tree || null;
      const node = tree ? findFolderTreeFileNode(tree, filePath) : null;
      if (!node) return null;
      return node.fileRef || node.sourceFile || node.handle || node.file || null;
    }

    async function readLiveFolderFileText(fileRef) {
      if (!fileRef) return '';
      if (typeof fileRef.text === 'function') {
        return await fileRef.text();
      }
      if (typeof fileRef.getFile === 'function') {
        const file = await fileRef.getFile();
        return await readFileAsText(file);
      }
      if (typeof fileRef.file === 'function') {
        const file = await fileRef.file();
        return await readFileAsText(file);
      }
      return await readFileAsText(fileRef);
    }

    function buildIndexTreeSummary(graph) {
      const lines = [];
      const files = Array.isArray(graph?.files) && graph.files.length
        ? graph.files
        : Array.isArray(graph?.nodes)
          ? graph.nodes.filter(node => node.type === 'file').map(node => ({
            path: node.path || node.label || 'archivo',
            name: node.name || node.label || node.path || 'archivo',
            refs: Array.isArray(node.refs) ? node.refs : [],
            functions: []
          }))
          : [];

      files.forEach((file, fileIndex) => {
        const path = String(file.path || file.name || 'archivo');
        lines.push(path);

        const refs = Array.isArray(file.refs) ? file.refs : [];
        if (refs.length) {
          lines.push('  refs');
          refs.forEach(ref => {
            lines.push('    ' + ref.name + ' -> ' + ref.source);
          });
          lines.push('');
        }

        const functions = Array.isArray(file.functions) ? file.functions : [];
        if (!functions.length) {
          lines.push('  Sin funciones detectadas');
          if (fileIndex < files.length - 1) lines.push('');
          return;
        }

        functions.forEach(fn => {
          const name = String(fn?.nombre || fn?.name || '').trim();
          if (!name) return;
          const calls = Array.isArray(fn.calls) ? fn.calls : Array.isArray(fn.llamadas) ? fn.llamadas : [];
          const normalizedCalls = calls
            .map(call => String(call || '').replace(/^this\./, '').trim())
            .filter(call => call && !/^(Get|Post|Put|Delete|Patch|UseGuards|UseInterceptors|Body|Query|Param|UploadedFile|UsuarioActual|Controller|Injectable)$/.test(call))
            .filter((call, index, arr) => arr.indexOf(call) === index);
          lines.push('  ' + name + (normalizedCalls.length ? ' -> ' + normalizedCalls.join(', ') : ''));
        });

        if (fileIndex < files.length - 1) lines.push('');
      });

      return lines.join('\n');
    }

    function formatIndexResultMarkdown(text) {
      return formatMarkdown(text).replace('class="code-block-wrap', 'class="code-block-wrap index-result-code-block');
    }

    function buildRecursiveIndexSectionsDisplay(sections) {
      const items = Array.isArray(sections) ? sections : [];
      const totalIndexed = items.reduce((sum, section) => sum + (Number(section?.indexedCount) || 0), 0);
      const header = '<div class="index-result-summary">Archivos indexados ' + totalIndexed + '</div>';
      return header + items.map((section, index) => {
        const title = escapeHtml(String(section?.label || 'archivo'));
        const code = escapeHtml(String(section?.summaryText || ''));
        return '<div class="index-result-section" data-index-section="' + index + '">'
          + '<button type="button" class="index-result-toggle" aria-expanded="false" data-index-toggle="' + index + '">'
          + '<span class="index-result-toggle-label">' + title + '</span>'
          + '<span class="index-result-toggle-icon">&#9660;</span>'
          + '</button>'
          + '<div class="index-result-section-body" hidden>'
          + '<div class="code-block-wrap index-result-code-block"><pre class="code-block"><code>' + code + '</code></pre></div>'
          + '</div>'
          + '</div>';
      }).join('');
    }

    function normalizeProjectPath(value) {
      return String(value || '').replace(/\\/g, '/').replace(/\/+/g, '/').replace(/^\.\//, '');
    }

    function dirnameProjectPath(filePath) {
      const normalized = normalizeProjectPath(filePath);
      const index = normalized.lastIndexOf('/');
      return index === -1 ? '' : normalized.slice(0, index);
    }

    function resolveRelativeProjectPath(fromFilePath, relativePath) {
      const baseDir = dirnameProjectPath(fromFilePath);
      const input = normalizeProjectPath(relativePath);
      const seed = baseDir ? (baseDir + '/' + input) : input;
      const parts = seed.split('/');
      const out = [];
      parts.forEach(part => {
        if (!part || part === '.') return;
        if (part === '..') {
          if (out.length) out.pop();
          return;
        }
        out.push(part);
      });
      return out.join('/');
    }

    function resolveIndexedEntryPath(entryByPath, fromFilePath, relativePath) {
      const baseResolved = resolveRelativeProjectPath(fromFilePath, relativePath);
      if (!baseResolved) return '';
      const candidates = [
        baseResolved,
        baseResolved + '.ts',
        baseResolved + '.js',
        baseResolved + '.css',
        baseResolved + '/index.ts',
        baseResolved + '/index.js',
        baseResolved + '/index.css'
      ];
      for (const candidate of candidates) {
        if (entryByPath.has(candidate)) return candidate;
      }
      return '';
    }

    function getIndexableFolderEntries(chat, filterText) {
      const entries = getChatFolderFileEntries(chat).filter(item => /\.(ts|js|css)$/i.test(String(item.path || item.name || '')));
      const targets = String(filterText || '').trim();
      const requested = targets
        ? targets.split(/[\s,]+/g).map(item => item.trim().replace(/^@/, '').toLowerCase()).filter(Boolean)
        : [];
      return requested.length
        ? entries.filter(item => {
            const name = String(item.name || '').toLowerCase();
            const path = String(item.path || '').toLowerCase();
            return requested.some(token => name === token || path.endsWith('/' + token) || path.endsWith('\\' + token) || path.includes(token));
          })
        : entries;
    }

    function getRecursiveIndexTargets(chat, filterText) {
      const raw = String(filterText || '').trim();
      if (!raw) return { mode: 'missing', items: [] };

      const entries = getIndexableFolderEntries(chat, '');
      const tokens = raw
        .split(/[\s,]+/g)
        .map(item => item.trim())
        .filter(Boolean);

      const patternToken = tokens.find(token => /^@\*\.[^/\s,]+$/i.test(token));
      if (patternToken) {
        const suffix = patternToken.slice(3).toLowerCase();
        const matched = entries.filter(entry => String(entry.name || '').toLowerCase().endsWith('.' + suffix));
        return {
          mode: 'pattern',
          items: matched.map(entry => ({
            label: String(entry.path || entry.name || ''),
            filterText: '@' + String(entry.path || entry.name || '')
          }))
        };
      }

      return {
        mode: 'direct',
        items: [{
          label: raw,
          filterText: raw
        }]
      };
    }

    async function readIndexableFolderEntries(chat, entries) {
      const files = [];
      for (const entry of entries) {
        const filePath = entry.path || entry.name;
        const fileRef = getLiveFolderFileReference(chat, filePath);
        if (!fileRef) continue;
        try {
          const content = await readLiveFolderFileText(fileRef);
          files.push({ name: entry.name || filePath, path: filePath, content });
        } catch (error) {
          files.push({ name: entry.name || filePath, path: filePath, content: '' });
        }
      }
      return files;
    }

    async function buildRecursiveIndexGraph(chat, filterText) {
      const indexer = window.nanochatTsIndexer;
      if (!indexer || typeof indexer.buildFunctionGraph !== 'function') {
        throw new Error('No está disponible el indexador local.');
      }

      const allEntries = getIndexableFolderEntries(chat, '');
      const entryByPath = new Map();
      allEntries.forEach(entry => {
        const path = normalizeProjectPath(entry.path || entry.name);
        if (path) entryByPath.set(path, entry);
      });

      const initialEntries = getIndexableFolderEntries(chat, filterText);
      if (!initialEntries.length) {
        throw new Error('No encontré archivos indexables para ese filtro.');
      }

      const queue = initialEntries.map(entry => normalizeProjectPath(entry.path || entry.name)).filter(Boolean);
      const visited = new Set();
      const loadedFiles = [];

      while (queue.length) {
        const currentPath = queue.shift();
        if (!currentPath || visited.has(currentPath)) continue;
        visited.add(currentPath);
        const entry = entryByPath.get(currentPath);
        if (!entry) continue;
        const files = await readIndexableFolderEntries(chat, [entry]);
        const file = files[0];
        if (!file) continue;
        loadedFiles.push(file);

        const graph = indexer.buildFunctionGraph([file], '');
        const indexedFiles = Array.isArray(graph?.files) ? graph.files : [];
        indexedFiles.forEach(indexedFile => {
          const refs = Array.isArray(indexedFile?.refs) ? indexedFile.refs : [];
          refs.forEach(ref => {
            const source = String(ref?.source || '').trim();
            if (!source) return;
            const resolved = resolveIndexedEntryPath(entryByPath, file.path || currentPath, source);
            if (resolved && entryByPath.has(resolved) && !visited.has(resolved)) {
              queue.push(resolved);
            }
          });
        });
      }

      return indexer.buildFunctionGraph(loadedFiles, '');
    }

    async function loadFolderFilePreview(chat, filePath) {
      if (!chat?.folderSelection?.tree || !filePath) return null;
      const node = findFolderTreeFileNode(chat.folderSelection.tree, filePath);
      if (!node || node.type !== 'file' || !isPreviewableFolderFileName(node.name)) return null;
      if (typeof node.content === 'string') return node;
      const fileRef = getLiveFolderFileReference(chat, filePath);
      if (!fileRef) return null;
      try {
        node.content = await readLiveFolderFileText(fileRef);
      } catch (error) {
        node.content = '';
      }
      return node;
    }

    async function openFileInPreviewPanel(chat, filePath) {
      if (!chat?.folderSelection || !filePath) return null;
      chat.folderPanelOpen = true;
      chat.folderPreviewPath = filePath;
      chat.folderPreviewLoading = true;
      chat.folderPreviewError = null;
      saveChatToStorage(chat);
      renderChats();
      const previewNode = await loadFolderFilePreview(chat, filePath);
      if (!previewNode) {
        chat.folderPreviewLoading = false;
        chat.folderPreviewError = 'No se pudo cargar la vista previa del archivo.';
        chat.statusMessage = 'No se pudo cargar la vista previa del archivo.';
        saveChatToStorage(chat);
        renderChats();
        return null;
      }
      chat.folderPreviewLoading = false;
      chat.folderPreviewError = null;
      saveChatToStorage(chat);
      renderChats();
      return previewNode;
    }

    function escapeAttribute(value) {
      return escapeHtml(String(value ?? '')).replace(/"/g, '&quot;');
    }

    function normalizeFileEntryText(value) {
      return String(value || '').trim().toLowerCase();
    }

    function getConnectionProfiles() {
      try {
        const raw = localStorage.getItem(CONNECTION_PROFILES_STORAGE) || '[]';
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        return [];
      }
    }

    function getConnectionProfileIdSuggestions(query) {
      const normalized = String(query || '').trim().toLowerCase();
      return getConnectionProfiles()
        .filter(profile => profile && profile.id)
        .filter(profile => {
          const id = String(profile.id || '').toLowerCase();
          const name = String(profile.name || '').toLowerCase();
          return !normalized || id.includes(normalized) || name.includes(normalized);
        })
        .sort((a, b) => {
          const aId = String(a.id || '').toLowerCase();
          const bId = String(b.id || '').toLowerCase();
          const aName = String(a.name || '').toLowerCase();
          const bName = String(b.name || '').toLowerCase();
          const aScore = aId.startsWith(normalized) ? 0 : aName.startsWith(normalized) ? 1 : 2;
          const bScore = bId.startsWith(normalized) ? 0 : bName.startsWith(normalized) ? 1 : 2;
          return aScore - bScore || aId.localeCompare(bId, 'es', { sensitivity: 'base' });
        })
        .slice(0, 10)
        .map(profile => ({
          name: 'Conexión: ' + profile.id,
          path: profile.id
        }));
    }

    function findChatFolderFileEntry(chat, mentionText) {
      const target = normalizeFileEntryText(mentionText);
      if (!target) return null;
      const files = getChatFolderFileEntries(chat);
      if (!files.length) return null;
      const exact = files.find(item => normalizeFileEntryText(item.path) === target || normalizeFileEntryText(item.name) === target);
      if (exact) return exact;
      const byName = files.find(item => normalizeFileEntryText(item.name) === target.split('/').pop());
      if (byName) return byName;
      const partial = files.find(item => {
        const name = normalizeFileEntryText(item.name);
        const path = normalizeFileEntryText(item.path);
        return name.includes(target) || path.includes(target);
      });
      return partial || null;
    }

    function buildMentionedFileDisplayHtml(chat, text) {
      const source = String(text || '');
      if (!source) return '';
      const pattern = /(^|[\s(])@([^\s@]+)/g;
      return formatMarkdown(source.replace(pattern, (match, prefix, mention) => {
        const file = findChatFolderFileEntry(chat, mention);
        if (!file) return match;
        const label = '@' + (file.path || file.name || mention);
        return prefix + '<a class="attachment-tag file-mention-link" href="#" data-file-path="' + escapeAttribute(file.path || file.name || mention) + '" title="' + escapeAttribute(file.path || file.name || mention) + '">&#128196; ' + escapeHtml(label) + '</a>';
      }));
    }

    async function resolveMentionedFiles(chat, text) {
      const source = String(text || '');
      if (!source) return { text: '', files: [] };
      const mentionRe = /@([^\s@]+)/g;
      const files = [];
      const seen = new Set();
      for (let match; (match = mentionRe.exec(source));) {
        const mention = match[1];
        const file = findChatFolderFileEntry(chat, mention);
        if (!file) continue;
        const key = (file.path || file.name || mention).toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);

        const filePath = file.path || file.name || mention;
        let fileText = '';
        const previewNode = await loadFolderFilePreview(chat, filePath);
        if (previewNode && typeof previewNode.content === 'string') {
          fileText = previewNode.content;
        } else {
          const fileRef = getLiveFolderFileReference(chat, filePath);
          if (fileRef) {
            try {
              fileText = await readLiveFolderFileText(fileRef);
            } catch (error) {
              fileText = '';
            }
          }
        }
        files.push({
          path: filePath,
          name: file.name || filePath,
          content: fileText
        });
      }
      return { text: source, files };
    }

    async function resolveFileByMention(chat, mentionText) {
      const file = findChatFolderFileEntry(chat, mentionText);
      if (!file) return null;
      const filePath = file.path || file.name || mentionText;
      let fileText = '';
      const previewNode = await loadFolderFilePreview(chat, filePath);
      if (previewNode && typeof previewNode.content === 'string') {
        fileText = previewNode.content;
      } else {
        const fileRef = getLiveFolderFileReference(chat, filePath);
        if (fileRef) {
          try {
            fileText = await readLiveFolderFileText(fileRef);
          } catch (error) {
            fileText = '';
          }
        }
      }
      return {
        path: filePath,
        name: file.name || filePath,
        content: fileText
      };
    }

    function buildLocalFilePreviewMessage(file) {
      const fileName = String(file?.name || file?.path || 'Archivo');
      const content = typeof file?.content === 'string' ? file.content : '';
      const rawText = fileName + '\n\n```text\n' + content + '\n```';
      return {
        role: 'assistant',
        content: rawText,
        display: '<div class="local-preview-title">' + escapeHtml(fileName) + '</div>' + formatMarkdown('```text\n' + content + '\n```'),
        rawText,
        isLocalPreviewResult: true
      };
    }

    function buildLocalContextMessage(contextMessage) {
      const content = String(contextMessage?.rawText || contextMessage?.content || '').trim() || 'No hay contexto establecido.';
      const rawText = 'Contexto actual\n\n```text\n' + content + '\n```';
      return {
        role: 'assistant',
        content: rawText,
        display: '<div class="local-preview-title">Contexto actual</div>' + formatMarkdown('```text\n' + content + '\n```'),
        rawText,
        isLocalPreviewResult: true,
        isLocalContextResult: true
      };
    }

    function getChainableChatMessages(chat) {
      return (Array.isArray(chat?.messages) ? chat.messages : [])
        .filter(message => message && !message.typing && !message.isLocalPreviewResult && !isTemporalMessageExpired(message))
        .filter(message => message.role === 'user' || message.role === 'assistant');
    }

    function getMessageSelectorEntries() {
      return [
        { key: 'last-user', label: 'Mi último mensaje' },
        { key: 'last-assistant', label: 'Última respuesta de IA' },
        { key: 'first-user', label: 'Mi primer mensaje' },
        { key: 'first-assistant', label: 'Primera respuesta de IA' },
        { key: 'all', label: 'Todos los mensajes' }
      ];
    }

    function buildLocalMensajesMessage() {
      const lines = getMessageSelectorEntries().map(item => item.key.padEnd(18, ' ') + item.label);
      const content = lines.join('\n');
      const rawText = 'Mensajes disponibles\n\n```text\n' + content + '\n```';
      return {
        role: 'assistant',
        content: rawText,
        display: '<div class="local-preview-title">Mensajes disponibles</div>' + formatMarkdown('```text\n' + content + '\n```'),
        rawText,
        isLocalPreviewResult: true,
        isLocalContextResult: true
      };
    }

    function parseMensajesCommandArgs(argsText) {
      const source = String(argsText || '').trim();
      const match = source.match(/^(?::([a-z-]+))?(?:\s+([\s\S]*))?$/i);
      return {
        selector: String(match?.[1] || '').trim().toLowerCase(),
        remainder: String(match?.[2] || '').trim()
      };
    }

    function resolveMensajesSelection(chat, selector) {
      const normalized = String(selector || '').trim().toLowerCase();
      const messages = getChainableChatMessages(chat);
      if (!normalized) {
        return { ok: false, error: 'Debes indicar un selector de /mensajes.' };
      }
      if (normalized === 'all') {
        const content = messages
          .map(message => {
            const roleLabel = message.role === 'user' ? 'user' : 'assistant';
            return '[' + roleLabel + ']\n' + String(message.rawText || message.content || '').trim();
          })
          .filter(Boolean)
          .join('\n\n');
        return { ok: true, result: content.trim(), count: messages.length };
      }
      const role = normalized.includes('user') ? 'user' : normalized.includes('assistant') ? 'assistant' : '';
      const edge = normalized.startsWith('first-') ? 'first' : normalized.startsWith('last-') ? 'last' : '';
      if (!role || !edge) {
        return { ok: false, error: 'Selector de /mensajes no válido.' };
      }
      const filtered = messages.filter(message => message.role === role);
      const picked = edge === 'first' ? filtered[0] : filtered[filtered.length - 1];
      if (!picked) {
        return { ok: true, result: '', count: 0 };
      }
      return {
        ok: true,
        result: String(picked.rawText || picked.content || '').trim(),
        count: 1
      };
    }

    function appendToChatContext(chat, textToAppend) {
      const currentContextText = String(chat?.contextMessage?.rawText || chat?.contextMessage?.content || '').trim();
      const nextChunk = String(textToAppend || '').trim();
      const nextContextText = currentContextText
        ? (currentContextText + '\n' + nextChunk)
        : nextChunk;
      chat.contextMessage = {
        content: nextContextText,
        display: formatMarkdown(nextContextText),
        rawText: nextContextText
      };
      chat._contextScrollDone = false;
    }

    function parseChainSyntax(text) {
      const externalRules = window.nanochatInputRules;
      if (externalRules && typeof externalRules.parseChainSyntax === 'function') {
        return externalRules.parseChainSyntax(text);
      }
      const source = String(text || '');
      if (!source.includes('->')) return null;
      const stages = source
        .split(/\s*->\s*/g)
        .map(stage => String(stage || '').trim())
        .filter(Boolean);
      if (stages.length < 2) return null;
      return { stages };
    }

    function extractChatTargetsFromText(text) {
      const source = String(text || '');
      const matches = [];
      const chatNames = chatState
        .map(chat => String(chat?.name || '').trim())
        .filter(Boolean)
        .sort((a, b) => b.length - a.length);

      let index = 0;
      while (index < source.length) {
        const hashIndex = source.indexOf('#', index);
        if (hashIndex === -1) break;

        const quotedMatch = source.slice(hashIndex).match(/^#\"([^\"]+)\"/);
        if (quotedMatch) {
          matches.push(String(quotedMatch[1] || '').trim());
          index = hashIndex + quotedMatch[0].length;
          continue;
        }

        const remainder = source.slice(hashIndex + 1);
        const matchedChatName = chatNames.find(name => remainder.toLowerCase().startsWith(name.toLowerCase()));
        if (matchedChatName) {
          matches.push(matchedChatName);
          index = hashIndex + 1 + matchedChatName.length;
          continue;
        }

        const fallbackMatch = remainder.match(/^([^\s#]+)/);
        if (fallbackMatch) {
          matches.push(String(fallbackMatch[1] || '').trim());
          index = hashIndex + 1 + fallbackMatch[0].length;
          continue;
        }

        index = hashIndex + 1;
      }

      return matches.filter(Boolean);
    }

    function stripChatTargetsFromText(text) {
      const source = String(text || '');
      const chatNames = chatState
        .map(chat => String(chat?.name || '').trim())
        .filter(Boolean)
        .sort((a, b) => b.length - a.length);

      let result = '';
      let index = 0;
      while (index < source.length) {
        const hashIndex = source.indexOf('#', index);
        if (hashIndex === -1) {
          result += source.slice(index);
          break;
        }

        result += source.slice(index, hashIndex);

        const quotedMatch = source.slice(hashIndex).match(/^#\"([^\"]+)\"/);
        if (quotedMatch) {
          index = hashIndex + quotedMatch[0].length;
          continue;
        }

        const remainder = source.slice(hashIndex + 1);
        const matchedChatName = chatNames.find(name => remainder.toLowerCase().startsWith(name.toLowerCase()));
        if (matchedChatName) {
          index = hashIndex + 1 + matchedChatName.length;
          continue;
        }

        const fallbackMatch = remainder.match(/^([^\s#]+)/);
        if (fallbackMatch) {
          index = hashIndex + 1 + fallbackMatch[0].length;
          continue;
        }

        result += '#';
        index = hashIndex + 1;
      }

      return result.replace(/\s+/g, ' ').trim();
    }

    function normalizeChainedActionText(text, hasTarget) {
      let value = String(text || '').trim();
      if (!hasTarget || !value) return value;
      value = value
        .replace(/^(env[ií]a(?:lo|la|las|les)?|manda(?:lo|la|las|les)?|pas[aá](?:lo|la|las|les)?)(?:\s+a)?\s+/i, '')
        .replace(/^(dile|p[íi]dele)(?:\s+a)?\s+/i, '')
        .replace(/^que\s+/i, '')
        .replace(/^y\s+/i, '')
        .trim();
      return value;
    }

    function shouldDirectTransferChainStage(targetName, cleanedAction) {
      return Boolean(targetName) && !String(cleanedAction || '').trim();
    }

    function isSilentContextChain(chain) {
      const stages = Array.isArray(chain?.stages) ? chain.stages : [];
      if (stages.length < 2) return false;
      return stages.slice(1).every(stage => /\/contexto\+?(?:\s|$)/i.test(String(stage || '').trim()));
    }

    async function resolveInitialChainStageResult(chat, stageText) {
      const source = String(stageText || '').trim();
      if (!source) return { handled: false, result: '' };

      const singleMentionMatch = source.match(/^@([^\s@]+)$/);
      if (singleMentionMatch) {
        const file = await resolveFileByMention(chat, singleMentionMatch[1]);
        if (!file) return { handled: true, result: '' };
        return {
          handled: true,
          result: String(file.content || '').trim(),
          kind: 'file',
          file
        };
      }

      if (/^\/contexto$/i.test(source)) {
        return {
          handled: true,
          result: String(chat?.contextMessage?.rawText || chat?.contextMessage?.content || '').trim(),
          kind: 'context'
        };
      }

      const mensajesMatch = source.match(/^\/mensajes(?::([a-z-]+))?$/i);
      if (mensajesMatch) {
        const selection = resolveMensajesSelection(chat, mensajesMatch[1]);
        return {
          handled: true,
          result: selection.ok ? String(selection.result || '').trim() : '',
          kind: 'messages'
        };
      }

      return { handled: false, result: '' };
    }

    function buildChainedStagePrompt(actionText, previousResult) {
      const action = String(actionText || '').trim() || 'Actúa sobre el resultado recibido.';
      const prior = String(previousResult || '').trim() || '[Sin resultado previo]';
      return '[Resultado previo]\n' + prior + '\n\n[Acción]\n' + action;
    }

    function buildChainRelayMessage(sourceChat, previousResult) {
      const sourceName = sourceChat?.name ? '#' + sourceChat.name : 'otro chat';
      const promptText = '[Resultado previo]\n' + (String(previousResult || '').trim() || '[Sin resultado previo]');
      return {
        role: 'user',
        content: '[Encadenamiento desde ' + sourceName + ']\n' + promptText,
        display: formatMarkdown('[Encadenamiento desde ' + sourceName + ']\n' + promptText),
        rawText: '[Encadenamiento desde ' + sourceName + ']\n' + promptText,
        isChainRelay: true
      };
    }

    function buildDirectTransferredMessage(previousResult) {
      const content = String(previousResult || '').trim() || '[Sin contenido]';
      return {
        role: 'assistant',
        content,
        display: formatMarkdown(content),
        rawText: content,
        isLocalPreviewResult: true,
        isLocalContextResult: true
      };
    }

    function parseBranchCommandArgs(text) {
      const source = String(text || '').trim();
      let scope = '';
      let remainder = source;
      if (/^\/resumen-anclados(?:\s|$)/i.test(remainder)) {
        scope = 'anclados';
        remainder = remainder.replace(/^\/resumen-anclados(?:\s+|$)/i, '').trim();
      } else if (/^\/resumen-general(?:\s|$)/i.test(remainder)) {
        scope = 'general';
        remainder = remainder.replace(/^\/resumen-general(?:\s+|$)/i, '').trim();
      }
      return {
        scope,
        promptText: remainder
      };
    }

    function buildBranchPromptText(promptText, sourceChat) {
      const prompt = String(promptText || '').trim();
      if (!prompt) return '';
      const lastMeaningfulMessage = [...(Array.isArray(sourceChat?.messages) ? sourceChat.messages : [])]
        .reverse()
        .find(message => message && !message.typing && !message.isLocalPreviewResult && !isTemporalMessageExpired(message));
      const lastMessageText = String(lastMeaningfulMessage?.rawText || lastMeaningfulMessage?.content || '').trim();
      const emphasis = lastMessageText
        ? '\n\n[Enfoque prioritario]\nPon especial atención al último mensaje de la conversación original:\n' + lastMessageText
        : '\n\n[Enfoque prioritario]\nPon especial atención al último mensaje relevante de la conversación original.';
      return prompt + emphasis;
    }

    function buildBranchSourceResult(sourceChat, scope, summaryText) {
      if (scope) return String(summaryText || '').trim();
      const messages = Array.isArray(sourceChat?.messages) ? sourceChat.messages : [];
      return buildFullConversationText(messages);
    }

    function splitCommandChainArgs(argsText) {
      const source = String(argsText || '').trim();
      const match = source.match(/^(.*?)\s*(->[\s\S]+)$/);
      if (!match) {
        return {
          commandArgs: source,
          chainText: ''
        };
      }
      return {
        commandArgs: String(match[1] || '').trim(),
        chainText: String(match[2] || '').trim()
      };
    }

    function parseActionChainStages(text) {
      return String(text || '')
        .replace(/^\s*->\s*/, '')
        .split(/\s*->\s*/g)
        .map(stage => String(stage || '').trim())
        .filter(Boolean);
    }

    function focusChat(chat) {
      if (!chat) return;
      chat.focused = true;
      chatState.forEach(item => { if (item.id !== chat.id) item.focused = false; });
      saveChatToStorage(chat);
      renderChats();
    }

    function cloneMessagesForTransfer(messages) {
      return (Array.isArray(messages) ? messages : [])
        .filter(message => message && !message.typing && !message.isLocalPreviewResult && !isTemporalMessageExpired(message))
        .map(item => cloneChatStateValue(item));
    }

    async function transferBranchContentToTargetChat(sourceChat, chainText) {
      const stages = parseActionChainStages(chainText);
      if (!stages.length) return false;
      const firstStage = stages[0];
      const targetNames = extractChatTargetsFromText(firstStage);
      const targetName = targetNames.length ? targetNames[targetNames.length - 1] : '';
      if (!targetName) return false;
      const targetChat = getChatByName(targetName);
      if (!targetChat) {
        throw new Error('No encontré el chat destino #' + targetName + '.');
      }
      const transferredMessages = cloneMessagesForTransfer(sourceChat?.messages);
      if (!transferredMessages.length) return false;
      targetChat.messages.push(...transferredMessages);
      saveChatToStorage(targetChat);
      focusChat(targetChat);
      return true;
    }

    async function executeChainedStagesFromResult(startChat, actionText, initialResult) {
      const stages = parseActionChainStages(actionText);
      if (!stages.length) return false;

      let currentChat = startChat;
      let previousResult = String(initialResult || '').trim();
      let finalChat = startChat;
      for (let stageIndex = 0; stageIndex < stages.length; stageIndex += 1) {
        const stageText = stages[stageIndex];
        if (stageIndex === 0 && !previousResult) {
          const initialStage = await resolveInitialChainStageResult(startChat, stageText);
          if (initialStage.handled) {
            previousResult = String(initialStage.result || '').trim();
            continue;
          }
        }
        const targetNames = extractChatTargetsFromText(stageText);
        const targetName = targetNames.length ? targetNames[targetNames.length - 1] : '';
        const stageChat = targetName ? getChatByName(targetName) : currentChat;
        if (targetName && !stageChat) {
          throw new Error('No encontré el chat destino #' + targetName + '.');
        }
        const stageTextWithoutTargets = stripChatTargetsFromText(stageText);
        const cleanedAction = normalizeChainedActionText(
          stageTextWithoutTargets || (targetName ? '' : stageText),
          Boolean(targetName)
        );
        if (shouldDirectTransferChainStage(targetName, cleanedAction)) {
          const transferredMessage = buildDirectTransferredMessage(previousResult);
          if (stageChat.temporalMode) transferredMessage.expiresAt = Date.now() + TEMPORAL_MESSAGE_TTL;
          stageChat.messages.push(transferredMessage);
          saveChatToStorage(stageChat);
          renderChats();
          currentChat = stageChat;
          finalChat = stageChat;
          continue;
        }
        let resolvedMentions = await resolveMentionedFiles(stageChat, cleanedAction);
        if ((!resolvedMentions.files || !resolvedMentions.files.length) && startChat && startChat !== stageChat) {
          resolvedMentions = await resolveMentionedFiles(startChat, cleanedAction);
        }
        if (/\/contexto\+(?:\s|$)/i.test(stageText)) {
          appendToChatContext(stageChat, previousResult);
          saveChatToStorage(stageChat);
          renderChats();
          currentChat = stageChat;
          finalChat = stageChat;
          continue;
        }
        if (/\/contexto\b/i.test(stageText)) {
          stageChat.contextMessage = {
            content: previousResult,
            display: formatMarkdown(previousResult),
            rawText: previousResult
          };
          stageChat._contextScrollDone = false;
          saveChatToStorage(stageChat);
          renderChats();
          currentChat = stageChat;
          finalChat = stageChat;
          continue;
        }
        if (stageChat !== currentChat || targetName) {
          const relayMessage = buildChainRelayMessage(currentChat, previousResult);
          if (stageChat.temporalMode) relayMessage.expiresAt = Date.now() + TEMPORAL_MESSAGE_TTL;
          stageChat.messages.push(relayMessage);
          saveChatToStorage(stageChat);
          renderChats();
        }

        try {
          const activeKey = getEngineKey(selectedEngine);
          const engineName = engineLabel(selectedEngine);
          if (!activeKey) {
            throw new Error('Conecta tu API key de ' + engineName + ' para responder.');
          }
          await sendPromptToChat(stageChat, cleanedAction, {
            displayText: cleanedAction,
            rawText: cleanedAction,
            mentionSourceChat: startChat
          });
          const lastAssistant = [...stageChat.messages].reverse().find(message => message && message.role === 'assistant' && !message.typing);
          previousResult = String(lastAssistant?.rawText || lastAssistant?.content || '').trim();
          currentChat = stageChat;
          finalChat = stageChat;
        } catch (error) {
          throw error;
        }
      }
      if (finalChat) {
        finalChat.focused = true;
        chatState.forEach(item => { if (item.id !== finalChat.id) item.focused = false; });
        saveChatToStorage(finalChat);
        renderChats();
      }
      return true;
    }

    async function sendPromptToChat(chat, promptText, options = {}) {
      const activeKey = getEngineKey(selectedEngine);
      const engineName = engineLabel(selectedEngine);
      if (!activeKey) {
        throw new Error('Conecta tu API key de ' + engineName + ' para responder.');
      }

      const normalizedPrompt = String(promptText || '').trim();
      if (!normalizedPrompt) return null;

      const displayText = options.displayText || normalizedPrompt;
      const rawText = options.rawText || displayText;
      let resolvedMentions = await resolveMentionedFiles(chat, normalizedPrompt);
      if ((!resolvedMentions.files || !resolvedMentions.files.length) && options.mentionSourceChat && options.mentionSourceChat !== chat) {
        resolvedMentions = await resolveMentionedFiles(options.mentionSourceChat, normalizedPrompt);
      }
      const userMessage = {
        role: 'user',
        content: normalizedPrompt,
        display: formatMarkdown(displayText),
        rawText
      };
      if (chat.temporalMode) userMessage.expiresAt = Date.now() + TEMPORAL_MESSAGE_TTL;
      chat.messages.push(userMessage);
      saveChatToStorage(chat);
      renderChats();

      if (parseChainSyntax(normalizedPrompt)) {
        await executeChainedMessage(chat, normalizedPrompt, userMessage);
        return userMessage;
      }

      const typingMessage = { role: 'assistant', typing: true };
      chat.messages.push(typingMessage);
      saveChatToStorage(chat);
      renderChats();

      try {
        const engineMessages = await buildEngineMessagesForChat(chat, {
          excludeMessage: userMessage,
          promptText: normalizedPrompt,
          mentionedFiles: resolvedMentions.files
        });
        const reply = await callSelectedEngine(engineMessages, activeKey);
        const typingIndex = chat.messages.indexOf(typingMessage);
        const replyMessage = { role: 'assistant', content: reply, display: formatMarkdown(reply), rawText: reply };
        if (chat.temporalMode) replyMessage.expiresAt = Date.now() + TEMPORAL_MESSAGE_TTL;
        if (typingIndex !== -1) chat.messages[typingIndex] = replyMessage; else chat.messages.push(replyMessage);
        saveChatToStorage(chat);
        renderChats();
        return userMessage;
      } catch (error) {
        const errorText = error && error.message ? error.message : ('No se pudo ejecutar la instrucción en ' + engineName + '.');
        const typingIndex = chat.messages.indexOf(typingMessage);
        const errorMessage = { role: 'assistant', content: errorText, display: escapeHtml(errorText), rawText: errorText };
        if (typingIndex !== -1) chat.messages[typingIndex] = errorMessage; else chat.messages.push(errorMessage);
        saveChatToStorage(chat);
        renderChats();
        throw error;
      }
    }

    async function handleBranchChatCommand(sourceChat, argsText) {
      const parsed = parseBranchCommandArgs(argsText);
      const isChainPrompt = /^\s*->/.test(parsed.promptText || '');
      const chainTargets = isChainPrompt ? extractChatTargetsFromText(parsed.promptText) : [];
      const shouldBypassBranchCreation = Boolean(isChainPrompt && chainTargets.length);
      let summaryText = '';
      if (parsed.scope) {
        summaryText = await buildChatSummaryText(sourceChat, parsed.scope);
      }

      const branchChat = shouldBypassBranchCreation
        ? null
        : (parsed.scope
          ? createBaseChatState({ name: generateUniqueBranchChatName(sourceChat?.name || '') })
          : createBranchChatFromSource(sourceChat, { name: generateUniqueBranchChatName(sourceChat?.name || '') }));

      if (parsed.scope && branchChat) {
        branchChat.contextMessage = {
          content: summaryText,
          display: formatMarkdown(summaryText),
          rawText: summaryText
        };
        branchChat.messages.push({
          role: 'assistant',
          content: summaryText,
          display: formatMarkdown(summaryText),
          rawText: summaryText,
          isSummary: true
        });
        addChatToState(branchChat);
        saveChatToStorage(branchChat);
        renderChats();
      } else if (branchChat && !chatState.includes(branchChat)) {
        addChatToState(branchChat);
      }

      if (parsed.promptText) {
        if (isChainPrompt) {
          const initialResult = buildBranchSourceResult(sourceChat, parsed.scope, summaryText);
          if (!parsed.scope && chainTargets.length) {
            await transferBranchContentToTargetChat(sourceChat, parsed.promptText);
          } else {
            await executeChainedStagesFromResult(sourceChat, parsed.promptText, initialResult);
          }
        } else {
          const promptWithFocus = parsed.scope
            ? parsed.promptText
            : buildBranchPromptText(parsed.promptText, sourceChat);
          await sendPromptToChat(branchChat, promptWithFocus, {
            displayText: parsed.promptText,
            rawText: parsed.promptText
          });
        }
      }

      if (branchChat && !isChainPrompt) {
        focusChat(branchChat);
      }
      return branchChat;
    }

    async function buildEngineMessagesForChat(chat, options = {}) {
      const history = (Array.isArray(chat?.messages) ? chat.messages : [])
        .filter(message => message !== options.excludeMessage)
        .filter(message => !message.typing && !message.isRule && !message.isPowerShell && !message.isLocalPreviewResult && !isTemporalMessageExpired(message))
        .map(message => ({ role: message.role, content: message.content }));

      if (chat?.pinnedFileContext?.path) {
        const pinnedFileContext = await resolveFileByMention(chat, chat.pinnedFileContext.path) || chat.pinnedFileContext;
        history.unshift({
          role: 'user',
          content: '[Archivo anclado: ' + pinnedFileContext.path + ']\n' + (pinnedFileContext.content || '[Contenido no disponible]')
        });
      }

      const mentionedFiles = Array.isArray(options.mentionedFiles) ? options.mentionedFiles : [];
      mentionedFiles.slice().reverse().forEach(file => {
        history.unshift({
          role: 'user',
          content: '[Archivo referenciado: ' + file.path + ']\n' + (file.content || '[Contenido no disponible]')
        });
      });

      if (chat?.contextMessage?.content) {
        history.unshift({ role: 'user', content: '[Contexto]: ' + chat.contextMessage.content });
      }

      const extraMessages = Array.isArray(options.extraMessages) ? options.extraMessages : [];
      extraMessages.forEach(message => history.push(message));

      if (options.promptText) {
        history.push({ role: 'user', content: String(options.promptText) });
      }

      return history;
    }

    async function executeChainedMessage(chat, rawText, userMessage) {
      const chain = parseChainSyntax(rawText);
      if (!chain) return false;
      const firstStageText = Array.isArray(chain.stages) && chain.stages.length ? chain.stages[0] : '';
      const initialLocalStage = await resolveInitialChainStageResult(chat, firstStageText);
      if (initialLocalStage && initialLocalStage.handled) {
        await executeChainedStagesFromResult(chat, rawText, '');
        return true;
      }

      const activeKey = getEngineKey(selectedEngine);
      const engineName = engineLabel(selectedEngine);
      if (!activeKey) {
        chat.messages.push({ role: 'assistant', content: 'Conecta tu API key de ' + engineName + ' para responder.' });
        saveChatToStorage(chat);
        renderChats();
        return true;
      }

      let currentChat = chat;
      let previousResult = '';
      let finalFocusChat = chat;

      for (let stageIndex = 0; stageIndex < chain.stages.length; stageIndex += 1) {
        const stageText = chain.stages[stageIndex];
        const targetNames = stageIndex > 0 ? extractChatTargetsFromText(stageText) : [];
        const targetName = targetNames.length ? targetNames[targetNames.length - 1] : '';
        const executionChat = targetName ? getChatByName(targetName) : currentChat;
        if (targetName && !executionChat) {
          setTemporaryChatStatus(chat, 'No encontré el chat destino #' + targetName + '.', 4200);
          return true;
        }

        const stageChat = executionChat || currentChat;
        const cleanedAction = stageIndex === 0 ? stageText : stripChatTargetsFromText(stageText);
        const resolvedMentions = await resolveMentionedFiles(stageChat, stageText);

        let promptText = '';
        let relayMessage = null;
        let excludedMessage = null;

        if (stageIndex === 0) {
          promptText = resolvedMentions.text || stageText;
          excludedMessage = userMessage || null;
        } else if (stageChat !== currentChat || targetName) {
          relayMessage = buildChainRelayMessage(currentChat, cleanedAction || resolvedMentions.text || stageText, previousResult);
          if (stageChat.temporalMode) relayMessage.expiresAt = Date.now() + TEMPORAL_MESSAGE_TTL;
          stageChat.messages.push(relayMessage);
          saveChatToStorage(stageChat);
          renderChats();
        } else {
          promptText = buildChainedStagePrompt(cleanedAction || resolvedMentions.text || stageText, previousResult);
        }

        const typingMessage = { role: 'assistant', typing: true };
        stageChat.messages.push(typingMessage);
        saveChatToStorage(stageChat);
        renderChats();

        try {
          const engineMessages = await buildEngineMessagesForChat(stageChat, {
            excludeMessage: excludedMessage,
            mentionedFiles: resolvedMentions.files,
            promptText,
            extraMessages: []
          });
          const reply = await callSelectedEngine(engineMessages, activeKey);
          const typingIndex = stageChat.messages.indexOf(typingMessage);
          const replyMessage = { role: 'assistant', content: reply, display: formatMarkdown(reply), rawText: reply };
          if (stageChat.temporalMode) replyMessage.expiresAt = Date.now() + TEMPORAL_MESSAGE_TTL;
          if (typingIndex !== -1) stageChat.messages[typingIndex] = replyMessage; else stageChat.messages.push(replyMessage);
          saveChatToStorage(stageChat);
          renderChats();
          previousResult = reply;
          currentChat = stageChat;
          finalFocusChat = stageChat;
        } catch (error) {
          const errorText = error && error.message ? error.message : ('No se pudo ejecutar el encadenamiento en ' + engineName + '.');
          const typingIndex = stageChat.messages.indexOf(typingMessage);
          const errorMessage = { role: 'assistant', content: errorText, display: escapeHtml(errorText), rawText: errorText };
          if (typingIndex !== -1) stageChat.messages[typingIndex] = errorMessage; else stageChat.messages.push(errorMessage);
          saveChatToStorage(stageChat);
          renderChats();
          return true;
        }
      }

      if (finalFocusChat) {
        finalFocusChat.focused = true;
        chatState.forEach(item => { if (item.id !== finalFocusChat.id) item.focused = false; });
        saveChatToStorage(finalFocusChat);
        renderChats();
      }
      return true;
    }

    function parseRuleSyntax(text) {
      const source = String(text || '').trim();
      if (!source.startsWith('>>')) return null;
      const body = source.slice(2).trim();
      const references = [...body.matchAll(/@([^\s@#]+)/g)].map(match => match[1]).filter(Boolean);
      const targetMatches = [...body.matchAll(/#(?:"([^"]+)"|([^\s@#][^\n\r]*?))(?:\s|$)/g)];
      const targets = targetMatches
        .map(match => String(match[1] || match[2] || '').trim())
        .filter(Boolean);
      const target = targets.length ? targets[targets.length - 1] : '';
      const instruction = body
        .replace(/@([^\s@#]+)/g, '')
        .replace(/#(?:"([^"]+)"|([^\s@#][^\n\r]*?))(?:\s|$)/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      return {
        execute: true,
        target,
        references,
        instruction
      };
    }

    async function buildRuleContextMessage(chat, rule) {
      const references = [];
      for (const reference of Array.isArray(rule.references) ? rule.references : []) {
        const file = await resolveFileByMention(chat, reference);
        if (!file) continue;
        references.push(file);
      }
      const chunks = [];
      references.forEach(file => {
        chunks.push('[Archivo referenciado: ' + file.path + ']');
        chunks.push(file.content || '[Contenido no disponible]');
        chunks.push('');
      });
      if (rule.instruction) chunks.push(rule.instruction);
      return { text: chunks.join('\n').trim(), references };
    }

    async function executeRuleMessage(chat, rawText) {
      const rule = parseRuleSyntax(rawText);
      if (!rule || !rule.execute) return false;
      if (!rule.target) {
        setTemporaryChatStatus(chat, 'La regla >> debe indicar un destino con #Chat.', 4200);
        return true;
      }
      const targetChat = getChatByName(rule.target);
      if (!targetChat) {
        setTemporaryChatStatus(chat, 'No encontré el chat destino #' + rule.target + '.', 4200);
        return true;
      }
      const activeKey = getEngineKey(selectedEngine);
      const engineName = engineLabel(selectedEngine);
      if (!activeKey) {
        setTemporaryChatStatus(chat, 'Conecta tu API key de ' + engineName + ' para ejecutar la regla.', 4200);
        return true;
      }

      const ruleContext = await buildRuleContextMessage(chat, rule);
      const runApiWithContext = async (sourceChat, extraMessages, promptText) => {
        const engineMessages = [];
        if (sourceChat.contextMessage && sourceChat.contextMessage.content) {
          engineMessages.push({ role: 'user', content: '[Contexto]: ' + sourceChat.contextMessage.content });
        }
        extraMessages.forEach(item => engineMessages.push(item));
        if (promptText) engineMessages.push({ role: 'user', content: promptText });
        if (selectedEngine === 'gemini') return await callGemini(engineMessages, activeKey);
        if (selectedEngine === 'groq') return await callGroq(engineMessages, activeKey);
        if (selectedEngine === 'deepseek') return await callDeepSeek(engineMessages, activeKey);
        return await callOpenAI(engineMessages, activeKey);
      };

      const typingMessage = { role: 'assistant', typing: true };
      chat.messages.push(typingMessage);
      renderChats();

      try {
        const reply = await runApiWithContext(chat, [
          ...(ruleContext.text ? [{ role: 'user', content: '[Regla]: ' + ruleContext.text }] : [])
        ], rule.instruction || rawText);

        const typingIndex = chat.messages.indexOf(typingMessage);
        const replyMessage = { role: 'assistant', content: reply, display: formatMarkdown(reply), rawText: reply };
        if (chat.temporalMode) replyMessage.expiresAt = Date.now() + TEMPORAL_MESSAGE_TTL;
        if (typingIndex !== -1) chat.messages[typingIndex] = replyMessage; else chat.messages.push(replyMessage);
        saveChatToStorage(chat);
        renderChats();

        const destinationTyping = { role: 'assistant', typing: true };
        targetChat.messages.push(destinationTyping);
        renderChats();

        const destinationPromptParts = [];
        if (targetChat.contextMessage && targetChat.contextMessage.content) {
          destinationPromptParts.push({ role: 'user', content: '[Contexto destino]: ' + targetChat.contextMessage.content });
        }
        destinationPromptParts.push({ role: 'user', content: '[Acción recibida desde #' + chat.name + ']: ' + reply });
        const destinationReply = await runApiWithContext(targetChat, destinationPromptParts, targetChat.draftText || 'Reacciona a la acción recibida y responde en consecuencia.');

        const destinationTypingIndex = targetChat.messages.indexOf(destinationTyping);
        const destinationMessage = { role: 'assistant', content: destinationReply, display: formatMarkdown(destinationReply), rawText: destinationReply };
        if (targetChat.temporalMode) destinationMessage.expiresAt = Date.now() + TEMPORAL_MESSAGE_TTL;
        if (destinationTypingIndex !== -1) targetChat.messages[destinationTypingIndex] = destinationMessage; else targetChat.messages.push(destinationMessage);
        targetChat.focused = true;
        chatState.forEach(item => { if (item.id !== targetChat.id) item.focused = false; });
        saveChatToStorage(chat);
        saveChatToStorage(targetChat);
        renderChats();
        return true;
      } catch (error) {
        const errorText = error && error.message ? error.message : ('No se pudo ejecutar la regla en ' + engineName + '.');
        const typingIndex = chat.messages.indexOf(typingMessage);
        const errorMessage = { role: 'assistant', content: errorText, display: escapeHtml(errorText), rawText: errorText };
        if (typingIndex !== -1) chat.messages[typingIndex] = errorMessage; else chat.messages.push(errorMessage);
        saveChatToStorage(chat);
        renderChats();
        return true;
      }
    }

    function isRuleMessage(message) {
      return Boolean(message && message.isRule);
    }

    function isAutocompleteTriggerBoundary(text, index) {
      if (index <= 0) return true;
      const previousChar = String(text || '').slice(index - 1, index);
      return /\s|[([{<>"'`]/.test(previousChar);
    }

    function getMentionStateFromInput(value, caretIndex) {
      const text = String(value || '');
      const caret = Math.max(0, Math.min(Number.isFinite(caretIndex) ? caretIndex : text.length, text.length));
      const beforeCaret = text.slice(0, caret);
      const atIndex = beforeCaret.lastIndexOf('@');
      const dollarIndex = beforeCaret.lastIndexOf('$');
      const slashIndex = beforeCaret.lastIndexOf('/');
      const tokenStart = Math.max(atIndex, dollarIndex, slashIndex);
      if (tokenStart === -1) return null;
      const triggerChar = beforeCaret.slice(tokenStart, tokenStart + 1);
      if (triggerChar !== '@' && triggerChar !== '$' && triggerChar !== '/') return null;
      if (!isAutocompleteTriggerBoundary(beforeCaret, tokenStart)) return null;
      const query = beforeCaret.slice(tokenStart + 1);
      if (triggerChar === '/' && /^mensajes\s*$/i.test(query)) {
        return {
          tokenStart,
          triggerChar,
          query: 'mensajes:'
        };
      }
      if (/\s/.test(query)) return null;
      return {
        tokenStart,
        triggerChar,
        query: query.trim().toLowerCase()
      };
    }

    function getChatTagStateFromInput(value, caretIndex) {
      const text = String(value || '');
      const caret = Math.max(0, Math.min(Number.isFinite(caretIndex) ? caretIndex : text.length, text.length));
      const beforeCaret = text.slice(0, caret);
      const hashIndex = beforeCaret.lastIndexOf('#');
      if (hashIndex === -1) return null;
      const query = beforeCaret.slice(hashIndex + 1);
      if (/\s/.test(query)) return null;
      return {
        tokenStart: hashIndex,
        query: query.trim().toLowerCase()
      };
    }

    function hideMentionMenu(panel) {
      const menu = panel?.querySelector('.mention-menu');
      if (!menu) return;
      menu.hidden = true;
      menu.classList.remove('open');
      menu.innerHTML = '';
    }

    function getChatNameSuggestions(query) {
      const normalized = String(query || '').trim().toLowerCase();
      return chatState
        .filter(chat => chat && !chat.deleted)
        .filter(chat => {
          const name = String(chat.name || '').toLowerCase();
          return !normalized || name.includes(normalized);
        })
        .sort((a, b) => {
          const aName = String(a.name || '').toLowerCase();
          const bName = String(b.name || '').toLowerCase();
          const aScore = aName.startsWith(normalized) ? 0 : 1;
          const bScore = bName.startsWith(normalized) ? 0 : 1;
          return aScore - bScore || aName.localeCompare(bName, 'es', { sensitivity: 'base' });
        })
        .slice(0, 10)
        .map(chat => ({ name: chat.name, path: chat.name }));
    }

    function getLocalCommandSuggestions(query) {
      const rules = window.nanochatInputRules;
      if (rules && typeof rules.getCommandSuggestions === 'function') {
        return rules.getCommandSuggestions(query).slice(0, 10);
      }
      return [];
    }

    function renderMentionMenu(chat, panel, input) {
      const menu = panel?.querySelector('.mention-menu');
      if (!menu || !input) return;
      const caret = input.selectionStart ?? input.value.length;
      const fileState = getMentionStateFromInput(input.value, caret);
      const chatStateMatch = getChatTagStateFromInput(input.value, caret);
      const state = fileState || chatStateMatch;
      if (!state) {
        hideMentionMenu(panel);
        return;
      }
      const isChatTag = Boolean(chatStateMatch && chatStateMatch.tokenStart === state.tokenStart);
      const isConnectionTag = Boolean(fileState && fileState.triggerChar === '$');
      const isCommandTag = Boolean(fileState && fileState.triggerChar === '/');
      const query = state.query;
      const sourceItems = isChatTag
        ? getChatNameSuggestions(query)
        : isConnectionTag
          ? getConnectionProfileIdSuggestions(query)
          : isCommandTag
            ? getLocalCommandSuggestions(query)
            : getChatFolderFileEntries(chat);
      const filtered = (query
        ? sourceItems.filter(item => {
          const name = String(item.name || '').toLowerCase();
          const path = String(item.path || '').toLowerCase();
          return name.includes(query) || path.includes(query);
        })
        : sourceItems.slice()
      ).sort((a, b) => {
        const aName = String(a.name || '').toLowerCase();
        const bName = String(b.name || '').toLowerCase();
        const aPath = String(a.path || '').toLowerCase();
        const bPath = String(b.path || '').toLowerCase();
        const aScore = aName.startsWith(query) ? 0 : aPath.startsWith(query) ? 1 : 2;
        const bScore = bName.startsWith(query) ? 0 : bPath.startsWith(query) ? 1 : 2;
        return aScore - bScore || aName.localeCompare(bName, 'es', { sensitivity: 'base' });
      }).slice(0, 10);
      if (!filtered.length) {
        menu.innerHTML = '<div class="empty-state">' + (isChatTag ? 'Sin chats que coincidan' : isConnectionTag ? 'Sin perfiles de conexión que coincidan' : isCommandTag ? 'Sin comandos que coincidan' : 'Sin archivos que coincidan') + '</div>';
        menu.hidden = false;
        menu.classList.add('open');
        chat.mentionSuggestions = [];
        chat.mentionActiveIndex = 0;
        chat.mentionTokenStart = state.tokenStart;
        return;
      }
      chat.mentionSuggestions = filtered;
      chat.mentionActiveIndex = Math.min(Number(chat.mentionActiveIndex) || 0, filtered.length - 1);
      chat.mentionTokenStart = state.tokenStart;
      menu.innerHTML = filtered.map((item, index) => (
        '<button type="button" class="mention-item' + (index === chat.mentionActiveIndex ? ' active' : '') + '" data-mention-index="' + index + '" data-mention-path="' + escapeHtml(item.path) + '">'
        + '<span class="mention-item-name">' + (isChatTag ? '#' : isConnectionTag ? '$' : isCommandTag ? '/' : '@') + escapeHtml(item.name || item.path) + '</span>'
        + '<span class="mention-item-path">' + escapeHtml(isCommandTag ? (item.desc || '') : (item.path || '')) + '</span>'
        + '</button>'
      )).join('');
      menu.hidden = false;
      menu.classList.add('open');
    }

    function selectMentionSuggestion(chat, panel, index) {
      const menu = panel?.querySelector('.mention-menu');
      const input = panel?.querySelector('.chat-message-input');
      const suggestions = Array.isArray(chat.mentionSuggestions) ? chat.mentionSuggestions : [];
      if (!menu || !input || !suggestions.length) return;
      const safeIndex = Math.max(0, Math.min(Number(index) || 0, suggestions.length - 1));
      const item = suggestions[safeIndex];
      if (!item) return;
      const caret = input.selectionStart ?? input.value.length;
      const tokenStart = Number.isFinite(chat.mentionTokenStart) ? chat.mentionTokenStart : Math.max(input.value.lastIndexOf('@', caret), input.value.lastIndexOf('#', caret), input.value.lastIndexOf('$', caret), input.value.lastIndexOf('/', caret));
      const start = tokenStart >= 0 ? tokenStart : caret;
      const triggerChar = input.value.slice(start, start + 1) === '#' ? '#' : (input.value.slice(start, start + 1) === '$' ? '$' : (input.value.slice(start, start + 1) === '/' ? '/' : '@'));
      const nextValue = input.value.slice(0, start) + triggerChar + (triggerChar === '/' ? (item.path || item.name || '') : (item.path || item.name || '')) + ' ' + input.value.slice(caret);
      input.value = nextValue;
      input.focus();
      const nextCaret = (input.value.slice(0, start) + triggerChar + (item.path || item.name || '') + ' ').length;
      input.setSelectionRange(nextCaret, nextCaret);
      chat.draftText = nextValue;
      chat.mentionSuggestions = [];
      chat.mentionActiveIndex = 0;
      chat.mentionTokenStart = null;
      hideMentionMenu(panel);
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }

    function buildPinnedShareText(messages, pinnedIndices, chatName, responseMode) {
      const sortedIndices = getPinnedContextIndices(messages, pinnedIndices);
      const exportMessages = sortedIndices.map(idx => {
        const message = messages[idx];
        return {
          role: message.role,
          content: message.content,
          display: message.display,
          rawText: message.rawText
        };
      });
      const newPinnedIndices = [];
      sortedIndices.forEach((origIdx, newIdx) => {
        if (pinnedIndices.includes(origIdx)) newPinnedIndices.push(newIdx);
      });
      return JSON.stringify({
        name: chatName + ' (anclados)',
        messages: exportMessages,
        responseMode,
        pinnedIndices: newPinnedIndices
      }, null, 2);
    }

    function buildChatExport(messages, pinnedIndices, chatName, responseMode) {
      return JSON.stringify({
        name: chatName,
        messages: messages.filter(message => !message.typing).map(message => ({
          role: message.role,
          content: message.content,
          display: message.display,
          rawText: message.rawText
        })),
        responseMode,
        pinnedIndices
      }, null, 2);
    }

    function setWorkspaceThreeChatPosition(chatEl, x, y) {
      if (!chatEl) return;
      chatEl.dataset.x = String(x);
      chatEl.dataset.y = String(y);
      chatEl.style.left = x + 'px';
      chatEl.style.top = (y - 10) + 'px';
    }

    function clampWorkspaceThreeValue(value, min, max) {
      return Math.min(max, Math.max(min, value));
    }

    function getWorkspaceThreeViewportCenter() {
      const stageWidth = workspaceThreeStage?.clientWidth || 960;
      const stageHeight = workspaceThreeStage?.clientHeight || 560;
      const scale = getWorkspaceThreeScale();
      let offsetX = 0;
      let offsetY = 0;
      const transform = workspaceThreeCanvas ? getComputedStyle(workspaceThreeCanvas).transform : 'none';
      if (transform && transform !== 'none') {
        const matrix = new DOMMatrixReadOnly(transform);
        offsetX = matrix.e || 0;
        offsetY = matrix.f || 0;
      }
      return {
        x: (stageWidth / 2 - offsetX) / scale,
        y: (stageHeight / 2 - offsetY) / scale
      };
    }

    function bringWorkspaceThreeChatToFront(target) {
      const state = target && target.element
        ? target
        : workspaceThreeMiniChats.find(item => item.element === target) || null;
      if (!state || state.closed) return;
      workspaceThreeZIndexCounter = Math.max(workspaceThreeZIndexCounter, Number(state.zIndex) || 0) + 1;
      state.zIndex = workspaceThreeZIndexCounter;
      state.element.style.zIndex = String(state.maximized ? Math.max(1000, state.zIndex) : state.zIndex);
      saveWorkspaceThreeToStorage();
    }

    function refreshWorkspaceThreeConnection() {
      if (workspaceThreeSection) {
        workspaceThreeSection.hidden = !workspaceThreeVisible;
      }
      workspaceThreeMiniChats.forEach(state => {
        const isVisibleForOwner = workspaceThreeVisible && activeWorkspaceThreeChatId && state.ownerChatId === activeWorkspaceThreeChatId;
        state.element?.classList.toggle('branch-filter-hidden', !isVisibleForOwner || state.closed);
      });
      if (!workspaceThreeJsPlumb) return;
      workspaceThreeMiniChats.forEach(state => {
        if (state.element) workspaceThreeJsPlumb.revalidate(state.element);
      });
      workspaceThreeConnections.forEach(connection => {
        const sourceOwner = connection?._workspaceThreeSourceState?.ownerChatId || null;
        const targetOwner = connection?._workspaceThreeTargetState?.ownerChatId || null;
        const isVisible = workspaceThreeVisible
          && activeWorkspaceThreeChatId
          && sourceOwner === activeWorkspaceThreeChatId
          && targetOwner === activeWorkspaceThreeChatId
          && !connection?._workspaceThreeSourceState?.closed
          && !connection?._workspaceThreeTargetState?.closed;
        if (connection?.setVisible) connection.setVisible(isVisible);
      });
      workspaceThreeJsPlumb.repaintEverything();
    }

    function setWorkspaceThreeActiveChat(chatId) {
      if (chatId) {
        const ownerChat = chatState.find(chat => chat.id === chatId) || null;
        const hasOwnedNodes = workspaceThreeMiniChats.some(state => state.ownerChatId === chatId);
        if (!hasOwnedNodes) {
          workspaceThreeMiniChats.forEach(state => {
            if (!state.ownerChatId) {
              state.ownerChatId = chatId;
              state.ownerChatName = ownerChat ? ownerChat.name : (state.ownerChatName || null);
            }
          });
          workspaceThreeConnections.forEach(connection => {
            if (connection?._workspaceThreeSourceState && !connection._workspaceThreeSourceState.ownerChatId) {
              connection._workspaceThreeSourceState.ownerChatId = chatId;
              connection._workspaceThreeSourceState.ownerChatName = ownerChat ? ownerChat.name : (connection._workspaceThreeSourceState.ownerChatName || null);
            }
            if (connection?._workspaceThreeTargetState && !connection._workspaceThreeTargetState.ownerChatId) {
              connection._workspaceThreeTargetState.ownerChatId = chatId;
              connection._workspaceThreeTargetState.ownerChatName = ownerChat ? ownerChat.name : (connection._workspaceThreeTargetState.ownerChatName || null);
            }
          });
        }
      }
      activeWorkspaceThreeChatId = chatId || null;
      workspaceThreeVisible = Boolean(activeWorkspaceThreeChatId);
      if (!workspaceThreeVisible && workspaceThreeMaximized) {
        setWorkspaceThreeMaximized(false);
      }
      refreshWorkspaceThreeConnection();
      renderChats();
      saveWorkspaceThreeToStorage();
    }

    function toggleWorkspaceThreeForChat(chatId) {
      if (!chatId) return;
      if (workspaceThreeVisible && activeWorkspaceThreeChatId === chatId) {
        setWorkspaceThreeActiveChat(null);
      } else {
        setWorkspaceThreeActiveChat(chatId);
      }
    }

    function disconnectWorkspaceThreeState(state) {
      if (!state?.connections?.length) return;
      const relatedConnections = state.connections.slice();
      state.connections = [];
      relatedConnections.forEach(connection => {
        workspaceThreeMiniChats.forEach(item => {
          if (item?.connections) {
            item.connections = item.connections.filter(entry => entry !== connection);
          }
        });
        const idx = workspaceThreeConnections.indexOf(connection);
        if (idx !== -1) workspaceThreeConnections.splice(idx, 1);
        if (workspaceThreeJsPlumb?.deleteConnection) {
          workspaceThreeJsPlumb.deleteConnection(connection);
        } else if (connection?.setVisible) {
          connection.setVisible(false);
        }
      });
      refreshWorkspaceThreeConnection();
    }

    function formatWorkspaceThreeContextHtml(rawText) {
      const plain = (rawText || '').trim();
      if (!plain) return '';
      return formatMarkdown(plain);
    }

    function getWorkspaceThreeMessagesSnapshot(state) {
      return state.messages
        .filter(message => message.el && message.el.isConnected)
        .map(message => ({
          role: message.role,
          content: message.text,
          rawText: message.text
        }));
    }

    function removeWorkspaceThreeMessage(state, messageId) {
      const index = state.messages.findIndex(message => message.id === messageId);
      if (index === -1) return;
      const [message] = state.messages.splice(index, 1);
      if (message.timerId) {
        clearTimeout(message.timerId);
        message.timerId = null;
      }
      if (message.el && message.el.parentNode) {
        message.el.parentNode.removeChild(message.el);
      }
      if (state.searchMatchIds.includes(messageId)) {
        state.searchMatchIds = state.searchMatchIds.filter(id => id !== messageId);
        state.searchCurrent = state.searchMatchIds.length ? Math.min(state.searchCurrent, state.searchMatchIds.length - 1) : -1;
      }
      state.pinnedMessageIds = state.pinnedMessageIds.filter(id => id !== messageId);
      state.viewingVersionId = null;
      saveWorkspaceThreeToStorage();
    }

    function scheduleWorkspaceThreeMessageExpiration(state, message) {
      if (!message.expiresAt) return;
      const delay = Math.max(0, message.expiresAt - Date.now());
      if (message.timerId) clearTimeout(message.timerId);
      message.timerId = window.setTimeout(() => {
        removeWorkspaceThreeMessage(state, message.id);
        refreshWorkspaceThreeHistoryMenu(state);
      }, delay);
    }

    function refreshWorkspaceThreeHistoryMenu(state) {
      if (!state.historyMenu) return;
      const userMessages = state.messages.filter(message => message.role === 'user' && message.el && message.el.isConnected);
      if (!userMessages.length) {
        state.historyMenu.innerHTML = '<div class="history-item">Sin mensajes enviados</div>';
        return;
      }
      state.historyMenu.innerHTML = userMessages.map(message => {
        const label = message.text.length > 72 ? message.text.slice(0, 72) + '...' : message.text;
        return '<button type="button" class="history-item" data-message-id="' + message.id + '">' + escapeHtml(label) + '</button>';
      }).join('');
    }

    function clearWorkspaceThreeSearch(state) {
      if (state.searchHighlightedEl) {
        clearHighlightsInElement(state.searchHighlightedEl);
        state.searchHighlightedEl = null;
      }
    }

    function recomputeWorkspaceThreeSearchMatches(state) {
      const query = state.searchInput.value.trim().toLowerCase();
      state.searchMatchIds = [];
      state.searchCurrent = -1;
      if (!query) return;
      state.messages.forEach(message => {
        if (!message.el || !message.el.isConnected) return;
        if (message.text.toLowerCase().includes(query)) state.searchMatchIds.push(message.id);
      });
    }

    function goToWorkspaceThreeSearchMatch(state, direction) {
      const query = state.searchInput.value.trim();
      if (!query || !state.searchMatchIds.length) return;

      let nextIndex;
      if (state.searchCurrent === -1) {
        nextIndex = direction === -1 ? state.searchMatchIds.length - 1 : 0;
      } else if (direction === -1) {
        nextIndex = state.searchCurrent === 0 ? 0 : state.searchCurrent - 1;
      } else {
        nextIndex = state.searchCurrent === state.searchMatchIds.length - 1 ? state.searchCurrent : state.searchCurrent + 1;
      }

      clearWorkspaceThreeSearch(state);
      state.searchCurrent = nextIndex;
      const message = state.messages.find(item => item.id === state.searchMatchIds[state.searchCurrent]);
      if (!message || !message.el) return;
      message.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      highlightMatchesInElement(message.el, query);
      state.searchHighlightedEl = message.el;
      message.el.classList.remove('search-flash');
      void message.el.offsetWidth;
      message.el.classList.add('search-flash');
      setTimeout(() => message.el.classList.remove('search-flash'), 850);
    }

    function bindWorkspaceThreePrivacyOverlay(state, overlayEl) {
      const inputEl = overlayEl.querySelector('.privacy-password-input');
      const unlockBtn = overlayEl.querySelector('.privacy-unlock-btn');
      const errorEl = overlayEl.querySelector('.privacy-overlay-error');
      if (!inputEl || !unlockBtn || !errorEl) return;
      inputEl.addEventListener('pointerdown', (event) => event.stopPropagation());
      const attemptUnlock = async () => {
        const saved = await loadPrivacyPassword();
        if (saved && inputEl.value === saved) {
          state.unlocked = true;
          renderWorkspaceThreeMiniChat(state);
          return;
        }
        errorEl.textContent = 'Contraseña incorrecta.';
        inputEl.value = '';
      };
      unlockBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        attemptUnlock();
      });
      inputEl.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          event.stopPropagation();
          attemptUnlock();
        }
      });
    }

    function renderWorkspaceThreeContextMessage(state) {
      const existingContext = state.body.querySelector('.message.context-message');
      if (!state.contextMessage || !state.contextMessage.rawText) {
        if (existingContext) existingContext.remove();
        return;
      }
      const contextPlain = (state.contextMessage.rawText || '').trim();
      const contextPreview = contextPlain.length > 100 ? contextPlain.slice(0, 100) + '...' : contextPlain;
      const contextDisplay = state.contextMessage.display || formatWorkspaceThreeContextHtml(contextPlain);
      const contextHtml = '<div class="message-content"><span class="context-preview">' + escapeHtml(contextPreview) + '</span><span class="context-full">' + contextDisplay + '</span></div>';
      if (existingContext) {
        existingContext.innerHTML = contextHtml;
        return;
      }
      const contextEl = document.createElement('div');
      contextEl.className = 'message context-message';
      contextEl.innerHTML = contextHtml;
      state.body.insertBefore(contextEl, state.body.firstChild);
    }

    function renderWorkspaceThreeMiniChat(state) {
      state.element.classList.toggle('minimized', state.minimized);
      state.element.classList.toggle('maximized', state.maximized);
      state.element.classList.toggle('closed', state.closed);
      state.element.style.zIndex = String(state.maximized ? Math.max(1000, Number(state.zIndex) || 1) : (Number(state.zIndex) || 1));
      state.favoriteToggle.classList.toggle('active', state.favorite);
      state.keyToggle.classList.toggle('active', state.isPrivate);
      state.temporalToggle.classList.toggle('active', state.temporalMode);
      state.minBtn.innerHTML = state.minimized ? '&#9633;' : '&#8722;';
      state.minBtn.title = state.minimized ? 'Restaurar' : 'Minimizar';
      state.maxBtn.innerHTML = state.maximized ? '&#11119;' : '&#9633;';
      state.maxBtn.title = state.maximized ? 'Restaurar tamaño' : 'Maximizar';
      state.closeBtn.title = state.closed ? 'Cerrado' : 'Cerrar';
      state.body.hidden = state.minimized || state.closed;
      state.compose.hidden = state.minimized || state.closed;

      const existingOverlay = state.element.querySelector('.privacy-overlay');
      if (state.isPrivate && !state.unlocked && !state.closed) {
        if (!existingOverlay) {
          const overlayEl = document.createElement('div');
          overlayEl.className = 'privacy-overlay';
          overlayEl.innerHTML = '<div class="privacy-overlay-box"><div>&#128274; Chat privado</div><div class="privacy-overlay-form"><input type="password" class="privacy-password-input" placeholder="Contraseña" autocomplete="off" /><button type="button" class="privacy-unlock-btn" title="Desbloquear">&#128274;</button></div><div class="privacy-overlay-error"></div></div>';
          state.element.appendChild(overlayEl);
          bindWorkspaceThreePrivacyOverlay(state, overlayEl);
        }
      } else if (existingOverlay) {
        existingOverlay.remove();
      }

      renderWorkspaceThreeContextMessage(state);
      refreshWorkspaceThreeHistoryMenu(state);
      refreshWorkspaceThreeConnection();
      saveWorkspaceThreeToStorage();
    }

    function renderWorkspaceThreeMessageBubble(state, message) {
      if (!state || !message?.el) return;
      const displayHtml = message.display || formatMarkdown(message.text || '');
      const isPinned = Array.isArray(state.pinnedMessageIds) && state.pinnedMessageIds.includes(message.id);
      const pinBtn = '<button type="button" class="msg-pin' + (isPinned ? ' active' : '') + '" data-message-id="' + message.id + '" title="' + (isPinned ? 'Desanclar' : 'Anclar') + '">&#128204;</button>';
      const copyBtn = '<button type="button" class="msg-copy" data-message-id="' + message.id + '" title="Copiar">&#128203;</button>';
      const replicateBtn = '<button type="button" class="msg-replicate" data-message-id="' + message.id + '" title="Reutilizar en caja de mensaje">&#128229;</button>';
      const deleteBtn = '<button type="button" class="msg-delete" data-message-id="' + message.id + '" title="Eliminar">&#128465;</button>';
      message.el.classList.toggle('summary-message', Boolean(message.isSummary));
      message.el.dataset.messageId = String(message.id);
      message.el.innerHTML = '<div class="message-content">' + displayHtml + '</div><div class="message-actions">' + copyBtn + pinBtn + replicateBtn + deleteBtn + '</div>';
    }

    function addWorkspaceThreeMessage(state, role, text, options) {
      if (!text) return null;
      const settings = options || {};
      const bubble = settings.existingEl || document.createElement('div');
      bubble.className = 'message ' + role + ' workspace-three-msg';
      if (!settings.existingEl) state.body.appendChild(bubble);
      const fixedId = Number(settings.messageId);
      const messageId = Number.isFinite(fixedId) ? fixedId : Number(state.nextMessageId || 0);
      const message = {
        id: messageId,
        role,
        text,
        el: bubble,
        display: settings.htmlContent || null,
        isSummary: Boolean(settings.isSummary),
        expiresAt: settings.expiresAt || null,
        timerId: null
      };
      state.nextMessageId = Math.max(Number(state.nextMessageId) || 0, messageId + 1);
      state.messages.push(message);
      renderWorkspaceThreeMessageBubble(state, message);
      if (message.expiresAt) scheduleWorkspaceThreeMessageExpiration(state, message);
      refreshWorkspaceThreeHistoryMenu(state);
      return message;
    }

    function updateWorkspaceThreeMessage(state, message, text, options) {
      if (!state || !message) return;
      const settings = options || {};
      message.text = text;
      message.display = settings.htmlContent || null;
      if (typeof settings.isSummary !== 'undefined') message.isSummary = Boolean(settings.isSummary);
      renderWorkspaceThreeMessageBubble(state, message);
      if (message.timerId) {
        clearTimeout(message.timerId);
        message.timerId = null;
      }
      message.expiresAt = settings.expiresAt || null;
      if (message.expiresAt) scheduleWorkspaceThreeMessageExpiration(state, message);
    }

    async function sendWorkspaceThreeMiniChatMessage(state) {
      if (state.closed || state.isPrivate && !state.unlocked || state.sending) return;
      const text = state.input.value.trim();
      if (!text) return;
      const contextoMatch = text.match(/^\/contexto:\s*(.*)$/is);
      if (contextoMatch) {
        const contextoText = contextoMatch[1].trim();
        state.contextMessage = contextoText
          ? { rawText: contextoText, display: formatWorkspaceThreeContextHtml(contextoText) }
          : null;
        state.input.value = '';
        renderWorkspaceThreeMiniChat(state);
        saveWorkspaceThreeToStorage();
        return;
      }
      const ramasParalelasMatch = text.match(/^\/ramas-paralelas(?:\s+([\s\S]*))?$/i);
      if (ramasParalelasMatch) {
        state.input.value = '';
        try {
          await handleWorkspaceThreeBranchCommand(state, (ramasParalelasMatch[1] || '').trim(), 'parallel');
        } catch (error) {
          const errorText = error && error.message ? error.message : 'No se pudo ejecutar /ramas-paralelas.';
          addWorkspaceThreeMessage(state, 'assistant', errorText);
          saveWorkspaceThreeToStorage();
        }
        return;
      }
      const ramasSecuencialesMatch = text.match(/^\/ramas-secuenciales(?:\s+([\s\S]*))?$/i);
      if (ramasSecuencialesMatch) {
        state.input.value = '';
        try {
          await handleWorkspaceThreeBranchCommand(state, (ramasSecuencialesMatch[1] || '').trim(), 'sequential');
        } catch (error) {
          const errorText = error && error.message ? error.message : 'No se pudo ejecutar /ramas-secuenciales.';
          addWorkspaceThreeMessage(state, 'assistant', errorText);
          saveWorkspaceThreeToStorage();
        }
        return;
      }
      const multiIaMatch = text.match(/^\/multi-ia(?:\s+([\s\S]*))?$/i);
      if (multiIaMatch) {
        state.input.value = '';
        try {
          await handleWorkspaceThreeMultiIaCommand(state, (multiIaMatch[1] || '').trim());
        } catch (error) {
          const errorText = error && error.message ? error.message : 'No se pudo ejecutar /multi-ia.';
          addWorkspaceThreeMessage(state, 'assistant', errorText);
          saveWorkspaceThreeToStorage();
        }
        return;
      }
      if (/^\/resumen-anclados$/i.test(text)) {
        state.input.value = '';
        await handleWorkspaceThreeResumenCommand(state, 'anclados');
        return;
      }
      if (/^\/resumen-general$/i.test(text)) {
        state.input.value = '';
        await handleWorkspaceThreeResumenCommand(state, 'general');
        return;
      }
      if (/^\/chatsversion$/i.test(text)) {
        state.input.value = '';
        handleWorkspaceThreeVersionsCommand(state);
        return;
      }
      if (/^\/eliminar$/i.test(text)) {
        state.input.value = '';
        handleWorkspaceThreeDeleteCommand(state);
        return;
      }
      state.viewingVersionId = null;
      const expiresAt = state.temporalMode ? Date.now() + TEMPORAL_MESSAGE_TTL : null;
      addWorkspaceThreeMessage(state, 'user', text, { expiresAt });
      state.input.value = '';
      state.body.scrollTop = state.body.scrollHeight;
      state.sending = true;

      const engineName = engineLabel(selectedEngine);
      const activeKey = getEngineKey(selectedEngine);
      if (!activeKey) {
        addWorkspaceThreeMessage(state, 'assistant', 'Conecta tu API key de ' + engineName + ' para responder.', { expiresAt });
        state.sending = false;
        saveWorkspaceThreeToStorage();
        return;
      }

      const engineMessages = state.messages
        .filter(message => !isTemporalMessageExpired(message))
        .map(message => ({ role: message.role, content: message.text }));
      if (state.contextMessage && state.contextMessage.rawText) {
        engineMessages.unshift({ role: 'user', content: '[Contexto]: ' + state.contextMessage.rawText });
      }

      const typingMessage = addWorkspaceThreeMessage(state, 'assistant', 'Escribiendo...');
      state.body.scrollTop = state.body.scrollHeight;

      try {
        const reply = await callSelectedEngine(engineMessages, activeKey);
        updateWorkspaceThreeMessage(state, typingMessage, reply, {
          htmlContent: formatMarkdown(reply),
          expiresAt
        });
      } catch (error) {
        const errorText = error && error.message ? error.message : ('No se pudo conectar con ' + engineName + '.');
        updateWorkspaceThreeMessage(state, typingMessage, errorText, { expiresAt });
      } finally {
        state.sending = false;
        state.body.scrollTop = state.body.scrollHeight;
        saveWorkspaceThreeToStorage();
      }
    }

    function toggleWorkspaceThreeMaximized(state) {
      if (state.closed) return;
      state.maximized = !state.maximized;
      if (state.maximized) {
        state.minimized = false;
        state.element.style.zIndex = String(Math.max(1000, Number(state.zIndex) || 1));
      } else {
        state.element.style.zIndex = String(Number(state.zIndex) || 1);
      }
      renderWorkspaceThreeMiniChat(state);
    }

    function initWorkspaceThreeMiniChat(config) {
      if (!config.element || !config.body || !config.input || !config.sendBtn) return null;
      const cleanInput = config.input.cloneNode(true);
      const cleanSendBtn = config.sendBtn.cloneNode(true);
      config.input.parentNode.replaceChild(cleanInput, config.input);
      config.sendBtn.parentNode.replaceChild(cleanSendBtn, config.sendBtn);
      const state = {
        id: config.id,
        name: config.name,
        assistantPrefix: config.assistantPrefix,
        element: config.element,
        body: config.body,
        input: cleanInput,
        sendBtn: cleanSendBtn,
        titleStrong: config.element.querySelector('.panel-title strong'),
        titleSpan: config.element.querySelector('.panel-title span'),
        compose: config.element.querySelector('.workspace-three-chat-compose'),
        minBtn: config.element.querySelector('.min-btn'),
        maxBtn: config.element.querySelector('.max-btn'),
        closeBtn: config.element.querySelector('.close-btn'),
        favoriteToggle: config.element.querySelector('.fav-toggle'),
        keyToggle: config.element.querySelector('.key-toggle'),
        temporalToggle: config.element.querySelector('.temporal-toggle'),
        historyWrap: config.element.querySelector('.panel-history'),
        historyToggle: config.element.querySelector('.history-toggle'),
        historyMenu: config.element.querySelector('.history-menu'),
        searchWrap: config.element.querySelector('.panel-search'),
        searchToggle: config.element.querySelector('.search-toggle'),
        searchInput: config.element.querySelector('.search-input'),
        searchPrevBtn: config.element.querySelector('.search-prev'),
        searchNextBtn: config.element.querySelector('.search-next'),
        shareWrap: config.element.querySelector('.panel-share'),
        shareToggle: config.element.querySelector('.share-toggle'),
        shareMenu: config.element.querySelector('.share-menu'),
        consoleWrap: config.element.querySelector('.panel-console'),
        consoleToggle: config.element.querySelector('.console-toggle'),
        consoleMenu: config.element.querySelector('.console-menu'),
        messages: [],
        nextMessageId: 0,
        favorite: false,
        isPrivate: false,
        unlocked: false,
        temporalMode: false,
        minimized: false,
        maximized: false,
        closed: false,
        zIndex: Number.isFinite(Number(config.zIndex)) ? Number(config.zIndex) : (++workspaceThreeZIndexCounter),
        ownerChatId: config.ownerChatId || null,
        ownerChatName: config.ownerChatName || null,
        contextMessage: config.contextMessage || null,
        connections: [],
        searchMatchIds: [],
        searchCurrent: -1,
        searchHighlightedEl: null,
        sending: false,
        pinnedMessageIds: Array.isArray(config.pinnedMessageIds) ? config.pinnedMessageIds.slice() : [],
        versions: Array.isArray(config.versions) ? config.versions : [],
        viewingVersionId: config.viewingVersionId || null,
        currentSourceLabel: config.currentSourceLabel || null,
        consoleShowVersions: false,
        consoleShowDelete: false
      };
      workspaceThreeZIndexCounter = Math.max(workspaceThreeZIndexCounter, state.zIndex);

      if (config.title) state.titleStrong.textContent = config.title;
      if (config.subtitle) state.titleSpan.textContent = config.subtitle;
      if (config.inputPlaceholder) state.input.placeholder = config.inputPlaceholder;

      state.body.querySelectorAll('.workspace-three-msg').forEach(messageEl => {
        const role = messageEl.classList.contains('user') ? 'user' : 'assistant';
        addWorkspaceThreeMessage(state, role, messageEl.textContent || '', { existingEl: messageEl });
      });

      function closeWorkspaceThreeActionMenus(exceptWrap) {
        [state.historyWrap, state.searchWrap, state.shareWrap, state.consoleWrap].forEach(wrap => {
          if (!wrap || wrap === exceptWrap) return;
          wrap.classList.remove('open');
        });
        if (exceptWrap !== state.searchWrap) {
          clearWorkspaceThreeSearch(state);
        }
      }

      state.minBtn?.addEventListener('click', (event) => {
        event.stopPropagation();
        if (state.closed) return;
        state.minimized = !state.minimized;
        if (state.minimized) state.maximized = false;
        renderWorkspaceThreeMiniChat(state);
      });
      state.maxBtn?.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleWorkspaceThreeMaximized(state);
      });
      state.closeBtn?.addEventListener('click', (event) => {
        event.stopPropagation();
        disconnectWorkspaceThreeState(state);
        state.closed = true;
        state.minimized = false;
        state.maximized = false;
        renderWorkspaceThreeMiniChat(state);
      });
      state.favoriteToggle?.addEventListener('click', (event) => {
        event.stopPropagation();
        if (state.closed) return;
        state.favorite = !state.favorite;
        renderWorkspaceThreeMiniChat(state);
      });
      state.keyToggle?.addEventListener('click', (event) => {
        event.stopPropagation();
        if (state.closed) return;
        if (!hasPrivacyPassword()) {
          pendingWorkspaceThreePrivacyChatId = state.id;
          openPrivacyPasswordModal();
          return;
        }
        if (state.isPrivate && !state.unlocked) return;
        if (state.isPrivate && state.unlocked) {
          state.isPrivate = false;
          state.unlocked = false;
        } else {
          state.isPrivate = true;
          state.unlocked = false;
        }
        renderWorkspaceThreeMiniChat(state);
      });
      state.temporalToggle?.addEventListener('click', (event) => {
        event.stopPropagation();
        if (state.closed) return;
        state.temporalMode = !state.temporalMode;
        if (state.temporalMode) {
          const expiresAt = Date.now() + TEMPORAL_MESSAGE_TTL;
          state.messages.forEach(message => {
            if (!message.el || !message.el.isConnected) return;
            message.expiresAt = expiresAt;
            scheduleWorkspaceThreeMessageExpiration(state, message);
          });
        }
        renderWorkspaceThreeMiniChat(state);
      });
      state.historyToggle?.addEventListener('click', (event) => {
        event.stopPropagation();
        if (state.closed) return;
        const willOpen = !state.historyWrap.classList.contains('open');
        closeWorkspaceThreeActionMenus(willOpen ? state.historyWrap : null);
        refreshWorkspaceThreeHistoryMenu(state);
        state.historyWrap.classList.toggle('open');
      });
      state.historyMenu?.addEventListener('click', (event) => {
        const item = event.target.closest('.history-item');
        if (!item) return;
        event.stopPropagation();
        const messageId = Number(item.getAttribute('data-message-id'));
        const message = state.messages.find(entry => entry.id === messageId);
        if (message && message.el) {
          message.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        state.historyWrap.classList.remove('open');
      });
      state.searchToggle?.addEventListener('click', (event) => {
        event.stopPropagation();
        if (state.closed) return;
        const willOpen = !state.searchWrap.classList.contains('open');
        closeWorkspaceThreeActionMenus(willOpen ? state.searchWrap : null);
        const open = state.searchWrap.classList.toggle('open');
        if (open) state.searchInput.focus();
        else clearWorkspaceThreeSearch(state);
      });
      state.searchInput?.addEventListener('pointerdown', (event) => event.stopPropagation());
      state.searchInput?.addEventListener('input', () => {
        clearWorkspaceThreeSearch(state);
        recomputeWorkspaceThreeSearchMatches(state);
      });
      state.searchInput?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          event.stopPropagation();
          if (state.searchCurrent === -1) recomputeWorkspaceThreeSearchMatches(state);
          goToWorkspaceThreeSearchMatch(state, 1);
        }
      });
      state.searchPrevBtn?.addEventListener('click', (event) => {
        event.stopPropagation();
        if (state.searchCurrent === -1) recomputeWorkspaceThreeSearchMatches(state);
        goToWorkspaceThreeSearchMatch(state, -1);
      });
      state.searchNextBtn?.addEventListener('click', (event) => {
        event.stopPropagation();
        if (state.searchCurrent === -1) recomputeWorkspaceThreeSearchMatches(state);
        goToWorkspaceThreeSearchMatch(state, 1);
      });
      state.shareToggle?.addEventListener('click', (event) => {
        event.stopPropagation();
        if (state.closed) return;
        const willOpen = !state.shareWrap.classList.contains('open');
        closeWorkspaceThreeActionMenus(willOpen ? state.shareWrap : null);
        state.shareWrap.classList.toggle('open');
      });
      state.shareMenu?.addEventListener('click', (event) => {
        const item = event.target.closest('.share-item');
        if (!item) return;
        event.stopPropagation();
        const text = buildChatExport(getWorkspaceThreeMessagesSnapshot(state), [], state.name, 'short');
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).catch(() => { });
        }
        state.shareWrap.classList.remove('open');
      });
      state.consoleToggle?.addEventListener('click', (event) => {
        event.stopPropagation();
        if (state.closed) return;
        const willOpen = !state.consoleWrap.classList.contains('open');
        closeWorkspaceThreeActionMenus(willOpen ? state.consoleWrap : null);
        state.consoleWrap.classList.toggle('open');
      });
      state.consoleMenu?.addEventListener('click', async (event) => {
        const item = event.target.closest('.console-item');
        if (!item) return;
        event.stopPropagation();
        state.consoleWrap.classList.remove('open');
        await runWorkspaceThreeConsoleCommand(state, item.getAttribute('data-command') || '');
      });
      state.body.addEventListener('click', (event) => {
        const pinBtn = event.target.closest('.msg-pin');
        const copyBtn = event.target.closest('.msg-copy');
        const replicateBtn = event.target.closest('.msg-replicate');
        const deleteBtn = event.target.closest('.msg-delete');
        const contextMessageEl = event.target.closest('.message.context-message');
        if (pinBtn) {
          event.stopPropagation();
          const messageId = Number(pinBtn.getAttribute('data-message-id'));
          const pos = state.pinnedMessageIds.indexOf(messageId);
          if (pos === -1) state.pinnedMessageIds.push(messageId);
          else state.pinnedMessageIds.splice(pos, 1);
          state.messages.forEach(message => renderWorkspaceThreeMessageBubble(state, message));
          saveWorkspaceThreeToStorage();
          return;
        }
        if (copyBtn) {
          event.stopPropagation();
          const messageId = Number(copyBtn.getAttribute('data-message-id'));
          const message = state.messages.find(entry => entry.id === messageId);
          const text = message ? (message.text || '') : '';
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).catch(() => { });
          }
          return;
        }
        if (replicateBtn) {
          event.stopPropagation();
          const messageId = Number(replicateBtn.getAttribute('data-message-id'));
          const message = state.messages.find(entry => entry.id === messageId);
          if (!message?.text) return;
          state.input.value = message.text;
          state.input.focus();
          return;
        }
        if (deleteBtn) {
          event.stopPropagation();
          const messageId = Number(deleteBtn.getAttribute('data-message-id'));
          removeWorkspaceThreeMessage(state, messageId);
          state.pinnedMessageIds = state.pinnedMessageIds.filter(id => id !== messageId);
          refreshWorkspaceThreeHistoryMenu(state);
          saveWorkspaceThreeToStorage();
          return;
        }
        if (contextMessageEl && !event.target.closest('a')) {
          event.stopPropagation();
          contextMessageEl.classList.toggle('expanded');
        }
      });
      state.input.addEventListener('pointerdown', (event) => event.stopPropagation());
      state.input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          sendWorkspaceThreeMiniChatMessage(state);
        }
      });
      state.sendBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        sendWorkspaceThreeMiniChatMessage(state);
      });
      state.element.querySelectorAll('button, input, textarea').forEach(control => {
        control.addEventListener('pointerdown', (event) => event.stopPropagation());
      });
      state.element.addEventListener('pointerdown', () => bringWorkspaceThreeChatToFront(state), true);
      state.element.addEventListener('focusin', () => bringWorkspaceThreeChatToFront(state));

      workspaceThreeMiniChats.push(state);
      renderWorkspaceThreeMiniChat(state);
      return state;
    }

    function initWorkspaceThreeMiniChats() {
      if (workspaceThreeMiniChats.length) return;
      if (workspaceThreeChat?.isConnected) {
        initWorkspaceThreeMiniChat({
        id: 'workspace-three-chat-one',
        name: 'Chat de Workspace Three',
        assistantPrefix: 'Workspace Three recibió: ',
        element: workspaceThreeChat,
        body: workspaceThreeChatBody,
        input: workspaceThreeChatInput,
        sendBtn: workspaceThreeChatSend
        });
      }
      if (workspaceThreeChatTwo?.isConnected) {
        initWorkspaceThreeMiniChat({
        id: 'workspace-three-chat-two',
        name: 'Chat Two',
        assistantPrefix: 'Chat Two recibió: ',
        element: workspaceThreeChatTwo,
        body: workspaceThreeChatBodyTwo,
        input: workspaceThreeChatInputTwo,
        sendBtn: workspaceThreeChatSendTwo
        });
      }
    }

    function removeWorkspaceThreeStarterChats() {
      workspaceThreeChat?.remove();
      workspaceThreeChatTwo?.remove();
    }

    function buildWorkspaceThreeChatMarkup(chatId, title, subtitle, placeholder) {
      const consoleMenuHtml = ''
        + '<button type="button" class="console-item panzoom-exclude" data-command="contexto">/contexto<span class="console-item-desc">Fija un mensaje de contexto siempre visible al inicio del chat</span></button>'
        + '<button type="button" class="console-item panzoom-exclude" data-command="mensajes">/mensajes<span class="console-item-desc">Lista accesos rápidos a mensajes del chat y permite encadenarlos</span></button>'
        + '<button type="button" class="console-item panzoom-exclude" data-command="rule">>> regla<span class="console-item-desc">Inicia una regla de interpretación y enrutamiento</span></button>'
        + '<button type="button" class="console-item panzoom-exclude" data-command="powershell">>>> powershell<span class="console-item-desc">Ejecuta comandos PowerShell localmente</span></button>'
        + '<button type="button" class="console-item panzoom-exclude" data-command="anclar-archivo">/anclar-archivo<span class="console-item-desc">Escribe el comando y luego menciona un archivo para anclarlo</span></button>'
        + '<button type="button" class="console-item panzoom-exclude" data-command="branch">/branch<span class="console-item-desc">Crea un chat Branch derivado del actual</span></button>'
        + '<button type="button" class="console-item panzoom-exclude" data-command="preview">/preview<span class="console-item-desc">Carga un archivo mencionado en el panel de vista previa</span></button>'
        + '<button type="button" class="console-item panzoom-exclude" data-command="limpiar">/limpiar<span class="console-item-desc">Elimina todos los mensajes de la versión actual sin borrar el contexto</span></button>'
        + '<button type="button" class="console-item panzoom-exclude" data-command="lienzo">/lienzo<span class="console-item-desc">Abre Workspace Three y coloca el chat actual en el lienzo</span></button>'
        + '<button type="button" class="console-item panzoom-exclude" data-command="ramas-paralelas">/ramas-paralelas<span class="console-item-desc">Escribe el comando en la caja para crear ramas hijas paralelas desde este chat</span></button>'
        + '<button type="button" class="console-item panzoom-exclude" data-command="ramas-secuenciales">/ramas-secuenciales<span class="console-item-desc">Escribe el comando en la caja para crear una cadena secuencial de ramas hacia la derecha</span></button>'
        + '<button type="button" class="console-item panzoom-exclude" data-command="multi-ia">/multi-ia<span class="console-item-desc">Escribe el comando en la caja para consultar varios motores con el mismo mensaje</span></button>'
        + '<button type="button" class="console-item panzoom-exclude" data-command="resumen-anclados">/resumen-anclados<span class="console-item-desc">Resume sólo los mensajes anclados de este chat</span></button>'
        + '<button type="button" class="console-item panzoom-exclude" data-command="resumen-general">/resumen-general<span class="console-item-desc">Resume toda la conversación de este chat</span></button>'
        + '<button type="button" class="console-item panzoom-exclude" data-command="chatsversion">/chatsversion<span class="console-item-desc">Carga una versión anterior guardada de este chat</span></button>'
        + '<button type="button" class="console-item panzoom-exclude" data-command="eliminar">/eliminar<span class="console-item-desc">Elimina la conversación actual o una versión guardada</span></button>';
      return '<div class="panel-top workspace-three-chat-header workspace-three-chat-drag-handle">'
        + '<div class="panel-title-row">'
        + '<div class="panel-title">'
        + '<div class="panel-dot"></div>'
        + '<strong>' + escapeHtml(title) + '</strong>'
        + '<span>' + escapeHtml(subtitle) + '</span>'
        + '</div>'
        + '<div class="panel-main-actions">'
        + '<button type="button" class="min-btn panzoom-exclude" title="Minimizar">&#8722;</button>'
        + '<button type="button" class="max-btn panzoom-exclude" title="Maximizar">&#9633;</button>'
        + '<button type="button" class="close-btn panzoom-exclude" title="Cerrar">&#215;</button>'
        + '</div></div>'
        + '<div class="panel-actions">'
        + '<button type="button" class="fav-toggle panzoom-exclude" title="Marcar como favorito">&#9733;</button>'
        + '<button type="button" class="key-toggle panzoom-exclude" title="Proteger chat con contraseña">&#128274;</button>'
        + '<button type="button" class="temporal-toggle panzoom-exclude" title="Activar modo temporal">&#9202;</button>'
        + '<div class="panel-history"><button type="button" class="history-toggle panzoom-exclude" title="Historial de mensajes enviados">&#9776;</button><div class="history-menu"></div></div>'
        + '<div class="panel-search"><button type="button" class="search-toggle panzoom-exclude" title="Buscar">&#128269;</button><div class="search-bar"><input type="text" class="search-input panzoom-exclude" placeholder="Buscar en el chat..." /><button type="button" class="search-prev panzoom-exclude" title="Anterior">&#8593;</button><button type="button" class="search-next panzoom-exclude" title="Siguiente">&#8595;</button></div></div>'
        + '<div class="panel-share"><button type="button" class="share-toggle panzoom-exclude" title="Compartir"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"></path><path d="M7 8l5-5 5 5"></path><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"></path></svg></button><div class="share-menu"><button type="button" class="share-item panzoom-exclude" data-share="all">Compartir todo el chat</button></div></div>'
        + '<div class="panel-console"><button type="button" class="console-toggle panzoom-exclude" title="Consola de comandos"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg></button><div class="console-menu">' + consoleMenuHtml + '</div></div>'
        + '</div></div>'
        + '<div class="panel-body workspace-three-chat-body panzoom-exclude" id="' + chatId + '-body"></div>'
        + '<div class="panel-input workspace-three-chat-compose">'
        + '<textarea class="chat-message-input panzoom-exclude" id="' + chatId + '-input" rows="2" placeholder="' + escapeHtml(placeholder) + '"></textarea>'
        + '<button class="panzoom-exclude" type="button" id="' + chatId + '-send">Enviar</button>'
        + '</div>';
    }

    function getWorkspaceThreeBranchOrigin(stepCount, ownerChatName, childSpacing) {
      const ownerChats = workspaceThreeMiniChats.filter(item => !item.closed && item.ownerChatName === ownerChatName);
      const totalHeight = Math.max(0, (stepCount - 1) * childSpacing);
      const canvasWidth = workspaceThreeCanvas?.clientWidth || 1800;
      const canvasHeight = workspaceThreeCanvas?.clientHeight || 1200;
      if (!ownerChats.length) {
        const center = getWorkspaceThreeViewportCenter();
        return {
          x: clampWorkspaceThreeValue(center.x - 520, 120, 260),
          y: clampWorkspaceThreeValue(center.y - (totalHeight / 2), 120, Math.max(120, canvasHeight - totalHeight - 180))
        };
      }
      const maxY = ownerChats.reduce((max, item) => {
        const y = Number(item.element?.dataset?.y || 140);
        return Math.max(max, y);
      }, 140);
      const clusterSpacing = Math.max(300, stepCount * 72);
      return {
        x: 180,
        y: clampWorkspaceThreeValue(maxY + clusterSpacing, 120, Math.max(120, canvasHeight - totalHeight - 180))
      };
    }

    function createWorkspaceThreeMiniChatNode(options) {
      if (!workspaceThreeCanvas) return null;
      const suffix = Date.now() + '-' + Math.random().toString(36).slice(2, 7);
      const chatId = 'workspaceThreeDynamic-' + suffix;
      const article = document.createElement('article');
      article.className = 'workspace-three-chat-panel workspace-three-chat';
      article.id = chatId;
      article.dataset.x = String(options.x || 180);
      article.dataset.y = String(options.y || 140);
      article.innerHTML = buildWorkspaceThreeChatMarkup(
        chatId,
        options.title || 'Workspace Three',
        options.subtitle || 'Rama',
        options.inputPlaceholder || 'Escribe un mensaje...'
      );
      workspaceThreeCanvas.appendChild(article);

      const state = initWorkspaceThreeMiniChat({
        id: options.id || chatId,
        name: options.name || options.title || 'Workspace Three',
        title: options.title || 'Workspace Three',
        subtitle: options.subtitle || 'Rama',
        assistantPrefix: options.assistantPrefix || ((options.title || 'Workspace Three') + ' recibió: '),
        element: article,
        body: article.querySelector('.workspace-three-chat-body'),
        input: article.querySelector('.chat-message-input'),
        sendBtn: article.querySelector('button[id$="-send"]'),
        zIndex: options.zIndex || null,
        ownerChatId: options.ownerChatId || null,
        ownerChatName: options.ownerChatName || null,
        pinnedMessageIds: options.pinnedMessageIds || [],
        versions: options.versions || [],
        viewingVersionId: options.viewingVersionId || null,
        currentSourceLabel: options.currentSourceLabel || null,
        contextMessage: options.contextMessage || null,
        inputPlaceholder: options.inputPlaceholder || 'Escribe un mensaje...'
      });
      if (!state) return null;

      wireWorkspaceThreeChatDrag(article);
      setWorkspaceThreeChatPosition(article, Number(article.dataset.x), Number(article.dataset.y));

      (options.seedMessages || []).forEach(seed => {
        addWorkspaceThreeMessage(state, seed.role || 'assistant', seed.text || '', {
          htmlContent: seed.htmlContent || null
        });
      });
      renderWorkspaceThreeMiniChat(state);
      return state;
    }

    function connectWorkspaceThreeNodes(sourceState, targetState) {
      if (!workspaceThreeJsPlumb || !sourceState?.element || !targetState?.element) return null;
      const connection = workspaceThreeJsPlumb.connect({
        source: sourceState.element,
        target: targetState.element,
        anchors: [['RightMiddle'], ['LeftMiddle']]
      });
      connection._workspaceThreeSourceState = sourceState;
      connection._workspaceThreeTargetState = targetState;
      workspaceThreeConnections.push(connection);
      sourceState.connections.push(connection);
      targetState.connections.push(connection);
      refreshWorkspaceThreeConnection();
      saveWorkspaceThreeToStorage();
      return connection;
    }

    function restoreWorkspaceThreeFromStorage() {
      const saved = loadWorkspaceThreeFromStorage();
      if (!saved || !Array.isArray(saved.chats) || !saved.chats.length) {
        syncWorkspaceThreeBranchFlags();
        chatState.forEach(saveChatToStorage);
        renderChats();
        return;
      }

      restoringWorkspaceThree = true;
      const restoredById = new Map();
      saved.chats.forEach(item => {
        const ownerChat = item.ownerChatName ? getChatByName(item.ownerChatName) : null;
        const state = createWorkspaceThreeMiniChatNode({
          id: item.id,
          name: item.name || item.title || 'Workspace Three',
          title: item.title || item.name || 'Workspace Three',
          subtitle: item.subtitle || 'Rama',
          assistantPrefix: item.assistantPrefix || ((item.title || item.name || 'Workspace Three') + ' recibió: '),
        ownerChatId: ownerChat ? ownerChat.id : null,
        ownerChatName: item.ownerChatName || (ownerChat ? ownerChat.name : null),
        zIndex: Number(item.zIndex) || undefined,
        x: Number.isFinite(Number(item.x)) ? Number(item.x) : 180,
        y: Number.isFinite(Number(item.y)) ? Number(item.y) : 140,
        inputPlaceholder: item.inputPlaceholder || 'Escribe un mensaje...',
        pinnedMessageIds: Array.isArray(item.pinnedMessageIds) ? item.pinnedMessageIds : [],
        versions: Array.isArray(item.versions) ? item.versions : [],
        viewingVersionId: item.viewingVersionId || null,
        currentSourceLabel: item.currentSourceLabel || null,
          contextMessage: item.contextMessage || null,
          seedMessages: []
        });
        if (!state) return;
        state.favorite = Boolean(item.favorite);
        state.isPrivate = Boolean(item.isPrivate);
        state.unlocked = false;
        state.temporalMode = Boolean(item.temporalMode);
        state.minimized = Boolean(item.minimized);
        state.maximized = Boolean(item.maximized);
        state.closed = Boolean(item.closed);
        state.nextMessageId = 0;
        (Array.isArray(item.messages) ? item.messages : []).forEach(message => {
          addWorkspaceThreeMessage(state, message.role || 'assistant', message.text || '', {
            messageId: Number.isFinite(Number(message.id)) ? Number(message.id) : undefined,
            htmlContent: message.display || null,
            isSummary: Boolean(message.isSummary),
            expiresAt: message.expiresAt || null
          });
        });
        state.nextMessageId = Math.max(state.nextMessageId, Number(item.nextMessageId) || 0);
        renderWorkspaceThreeMiniChat(state);
        restoredById.set(state.id, state);
      });
      (Array.isArray(saved.connections) ? saved.connections : []).forEach(connection => {
        const sourceState = restoredById.get(connection.sourceId);
        const targetState = restoredById.get(connection.targetId);
        if (sourceState && targetState) {
          connectWorkspaceThreeNodes(sourceState, targetState);
        }
      });
      restoringWorkspaceThree = false;

      syncWorkspaceThreeBranchFlags();
      chatState.forEach(saveChatToStorage);
      const activeOwnerChat = saved.activeOwnerChatName ? getChatByName(saved.activeOwnerChatName) : null;
      if (saved.visible && activeOwnerChat) {
        setWorkspaceThreeActiveChat(activeOwnerChat.id);
      } else {
        setWorkspaceThreeActiveChat(null);
      }
      setWorkspaceThreeMaximized(Boolean(saved.maximized));
      saveWorkspaceThreeToStorage();
      renderChats();
    }

    function generateVersionId() {
      return 'v' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
    }

    function formatVersionLineage(label, sourceLabel) {
      return (sourceLabel ? escapeHtml(sourceLabel) + ' &#8594; ' : '') + escapeHtml(label);
    }

    function getPinnedContextIndices(messages, pinnedIndices) {
      const includedIndices = new Set();
      pinnedIndices.forEach(idx => {
        const msg = messages[idx];
        if (!msg || msg.typing) return;
        if (msg.role === 'assistant') {
          const prev = messages[idx - 1];
          if (prev && prev.role === 'user') includedIndices.add(idx - 1);
          includedIndices.add(idx);
        } else {
          includedIndices.add(idx);
          const next = messages[idx + 1];
          if (next && next.role === 'assistant' && !next.typing) includedIndices.add(idx + 1);
        }
      });
      return Array.from(includedIndices).sort((a, b) => a - b);
    }

    function buildPinnedConversationText(messages, pinnedIndices) {
      const sortedIndices = getPinnedContextIndices(messages, pinnedIndices);
      return sortedIndices.map(idx => {
        const message = messages[idx];
        const raw = (message.rawText || message.content || '').trim();
        const label = message.role === 'user' ? 'Usuario' : 'Asistente';
        return label + ': ' + raw;
      }).join('\n\n');
    }

    function buildFullConversationText(messages) {
      return messages
        .filter(message => !message.typing && !isTemporalMessageExpired(message))
        .map(message => {
          const raw = (message.rawText || message.content || '').trim();
          const label = message.role === 'user' ? 'Usuario' : 'Asistente';
          return label + ': ' + raw;
        })
        .join('\n\n');
    }

    function extractWorkspaceThreeIntentLabel(stepText, index) {
      const withoutCode = String(stepText || '').replace(/```[\s\S]*?```/g, ' ');
      const lines = withoutCode
        .split(/\r?\n/)
        .map(line => line.replace(/^(\d+\.\s+|[-*]\s+)/, '').replace(/`/g, '').trim())
        .filter(Boolean);
      const candidate = lines[0]
        ? lines[0].replace(/\s+/g, ' ').replace(/^paso\s+\d+\s*[:\-]?\s*/i, '').trim()
        : '';
      if (!candidate) return 'Paso ' + (index + 1);
      return candidate.length > 44 ? candidate.slice(0, 41).trimEnd() + '...' : candidate;
    }

    function setTemporaryChatStatus(chat, text, timeoutMs = 3200) {
      if (!chat) return;
      chat.statusMessage = text;
      renderChats();
      if (chat._statusTimer) clearTimeout(chat._statusTimer);
      chat._statusTimer = setTimeout(() => {
        chat.statusMessage = null;
        chat._statusTimer = null;
        renderChats();
      }, timeoutMs);
    }

    function extractJsonObjectFromText(text) {
      if (!text) return null;
      const fenced = text.match(/```json\s*([\s\S]*?)```/i) || text.match(/```\s*([\s\S]*?)```/i);
      const candidate = fenced ? fenced[1].trim() : text.trim();
      const start = candidate.indexOf('{');
      const end = candidate.lastIndexOf('}');
      if (start === -1 || end === -1 || end <= start) return null;
      const raw = candidate.slice(start, end + 1);
      try {
        return JSON.parse(raw);
      } catch (error) {
        return null;
      }
    }

    function extractOrderedStepsFromText(text) {
      if (!text) return [];
      const lines = text.split(/\r?\n/);
      const steps = [];
      let current = null;
      let inCodeBlock = false;

      lines.forEach(line => {
        const raw = line.replace(/\t/g, '  ');
        const trimmed = raw.trim();
        if (!trimmed) {
          if (current && current.length && current[current.length - 1] !== '') current.push('');
          return;
        }
        if (/^```/.test(trimmed)) {
          inCodeBlock = !inCodeBlock;
          if (current) current.push(trimmed);
          return;
        }
        const stepMatch = trimmed.match(/^(\d+\.\s+|[-*]\s+)(.+)$/);
        if (!inCodeBlock && stepMatch) {
          if (current) steps.push(current.join('\n').trim());
          current = [stepMatch[2]];
          return;
        }
        if (current) {
          current.push(trimmed);
        }
      });
      if (current) steps.push(current.join('\n').trim());
      return steps.filter(Boolean);
    }

    function normalizeBranchSteps(stepList, fallbackText) {
      const rawSteps = Array.isArray(stepList) ? stepList : [];
      const cleaned = rawSteps
        .map(step => String(step || '').trim())
        .filter(Boolean);
      if (cleaned.length) return cleaned;
      return extractOrderedStepsFromText(fallbackText);
    }

    async function callSelectedEngine(messages, activeKey) {
      return callEngineByName(selectedEngine, messages, activeKey);
    }

    async function callEngineByName(engine, messages, activeKey) {
      if (engine === 'gemini') return callGemini(messages, activeKey);
      if (engine === 'groq') return callGroq(messages, activeKey);
      if (engine === 'deepseek') return callDeepSeek(messages, activeKey);
      return callOpenAI(messages, activeKey);
    }

    function getConfiguredEngineEntries() {
      return ['openai', 'gemini', 'groq', 'deepseek']
        .map(engine => ({
          engine,
          label: engineLabel(engine),
          key: getEngineKey(engine)
        }))
        .filter(entry => entry.key);
    }

    function buildChatSummaryInstruction() {
      return 'Resume la siguiente conversación siguiendo EXACTAMENTE esta plantilla de formato:\n\n'
        + '[Párrafo breve de 1-2 frases con la intención general de la conversación, de qué se trata todo]\n\n'
        + '- [Punto o paso 1, redactado como intención/acción directa, ej: "Instalar imagen de YOLOv5"]\n'
        + '```\n[comando exacto si el punto 1 tiene uno, en su propia línea, nunca mezclado con el texto]\n```\n'
        + '- [Punto o paso 2]\n'
        + '```\n[comando del punto 2, si aplica]\n```\n\n'
        + 'Reglas: cada bloque de comando va SIEMPRE en su propia línea encerrado entre triple backtick (```), nunca dentro de la misma línea del punto ni como texto plano. '
        + 'Si un punto no tiene comando, omite el bloque para ese punto. '
        + 'No uses el formato "Usuario: ..." ni "Asistente: ...". '
        + 'No incluyas comentarios sobre lo que hizo el asistente si no aportan información nueva (por ejemplo, evita frases como "Asistente: proporciona el comando").\n\n'
        + 'Conversación a resumir:\n\n';
    }

    async function generateChatSummaryWithCurrentEngine(transcript) {
      const engineName = engineLabel(selectedEngine);
      const activeKey = getEngineKey(selectedEngine);
      if (!activeKey) {
        throw new Error('Conecta tu API key de ' + engineName + ' para generar el resumen.');
      }
      return callSelectedEngine([
        { role: 'user', content: buildChatSummaryInstruction() + transcript }
      ], activeKey);
    }

    async function buildBranchPlanFromChat(chat) {
      const activeMessages = chat.messages.filter(message => !message.typing && !isTemporalMessageExpired(message));
      const lastAssistantMessage = [...activeMessages].reverse().find(message => message.role === 'assistant');
      if (!lastAssistantMessage) {
        throw new Error('Necesito un último mensaje del asistente con pasos para crear las ramas.');
      }

      const transcript = buildFullConversationText(activeMessages);
      const lastAssistantText = (lastAssistantMessage.rawText || lastAssistantMessage.content || '').trim();
      const contextPrefix = chat.contextMessage?.content ? ('Contexto fijo del chat:\n' + chat.contextMessage.content + '\n\n') : '';
      const activeKey = getEngineKey(selectedEngine);
      const engineName = engineLabel(selectedEngine);
      if (!activeKey) {
        throw new Error('Conecta tu API key de ' + engineName + ' para usar comandos de ramas.');
      }

      const branchInstruction = 'Analiza esta conversación y el último mensaje del asistente. '
        + 'Responde SOLO con JSON válido, sin markdown, con esta forma exacta: '
        + '{"summary":"resumen breve y operativo del chat, enfocado en ejecutar el último mensaje","steps":["paso 1","paso 2"]}. '
        + 'Reglas: el summary debe condensar el contexto útil de toda la conversación. '
        + 'La lista steps debe salir del último mensaje del asistente, en el mismo orden, normalizando redacción solo si ayuda. '
        + 'Si un paso incluye comandos o subinstrucciones, mantenlos dentro del mismo string usando saltos de línea. '
        + 'No inventes pasos extra si no están implícitos de forma clara en el último mensaje.';

      const reply = await callSelectedEngine([
        {
          role: 'user',
          content: branchInstruction
            + '\n\n'
            + contextPrefix
            + 'Conversación completa:\n'
            + transcript
            + '\n\nÚltimo mensaje del asistente:\n'
            + lastAssistantText
        }
      ], activeKey);

      const parsed = extractJsonObjectFromText(reply) || {};
      const summary = String(parsed.summary || '').trim();
      const steps = normalizeBranchSteps(parsed.steps, lastAssistantText);
      if (!steps.length) {
        throw new Error('No pude extraer pasos accionables del último mensaje del asistente.');
      }
      return {
        summary: summary || 'Resumen operativo no disponible.',
        steps,
        rawModelReply: reply,
        lastAssistantText
      };
    }

    async function handleRamasCommand(chat) {
      const plan = await buildBranchPlanFromChat(chat);
      const branchOrigin = getWorkspaceThreeBranchOrigin(plan.steps.length);
      const childSpacing = 220;
      const childX = branchOrigin.x + 700;
      const totalHeight = Math.max(0, (plan.steps.length - 1) * childSpacing);
      const parentY = branchOrigin.y + (totalHeight / 2);
      const stepsText = plan.steps.map((step, index) => (index + 1) + '. ' + step).join('\n\n');
      const parentContext = 'Resumen del chat:\n'
        + plan.summary
        + '\n\nPasos recomendados del último mensaje:\n'
        + stepsText;

      const parentState = createWorkspaceThreeMiniChatNode({
        id: 'workspace-three-branch-parent-' + Date.now(),
        name: 'Ramas de ' + chat.name,
        title: 'Ramas de ' + chat.name,
        subtitle: 'Contexto base',
        ownerChatId: chat.id,
        ownerChatName: chat.name,
        x: branchOrigin.x,
        y: parentY,
        assistantPrefix: 'Nodo padre recibió: ',
        inputPlaceholder: 'Escribe para expandir esta rama...',
        contextMessage: {
          rawText: parentContext,
          display: formatWorkspaceThreeContextHtml(parentContext)
        },
        seedMessages: [
          {
            role: 'assistant',
            text: 'Se generaron ' + plan.steps.length + ' ramas desde el último mensaje recomendado.',
            htmlContent: formatMarkdown('Se generaron **' + plan.steps.length + '** ramas desde el último mensaje recomendado.')
          }
        ]
      });
      if (!parentState) {
        throw new Error('No pude crear el nodo padre en Workspace Three.');
      }

      plan.steps.forEach((step, index) => {
        const childContext = 'Resumen base:\n'
          + plan.summary
          + '\n\nPaso asignado:\n'
          + ((index + 1) + '. ' + step);
        const childState = createWorkspaceThreeMiniChatNode({
          id: 'workspace-three-branch-child-' + Date.now() + '-' + index,
          name: 'Paso ' + (index + 1),
          title: 'Paso ' + (index + 1),
          subtitle: chat.name,
          ownerChatId: chat.id,
          x: childX,
          y: branchOrigin.y + (index * childSpacing),
          assistantPrefix: 'Paso ' + (index + 1) + ' recibió: ',
          inputPlaceholder: 'Desarrolla este paso...',
          contextMessage: {
            rawText: childContext,
            display: formatWorkspaceThreeContextHtml(childContext)
          },
          seedMessages: [
            {
              role: 'assistant',
              text: step,
              htmlContent: formatMarkdown(step)
            }
          ]
        });
        if (childState) connectWorkspaceThreeNodes(parentState, childState);
      });

      setTemporaryChatStatus(chat, 'Se crearon ' + plan.steps.length + ' ramas en Workspace Three.');
      workspaceThreeSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function applyBranchFilterToSteps(steps, branchFilter) {
      if (!branchFilter) return steps.slice();
      const trimmedFilter = String(branchFilter || '').trim();
      if (!trimmedFilter) return steps.slice();

      const numberIndexes = Array.from(trimmedFilter.matchAll(/\b(\d+)\b/g))
        .map(match => Number(match[1]) - 1)
        .filter(index => Number.isInteger(index) && index >= 0 && index < steps.length);
      if (numberIndexes.length) {
        return Array.from(new Set(numberIndexes)).map(index => steps[index]).filter(Boolean);
      }

      const stopwords = new Set(['paso', 'pasos', 'y', 'o', 'de', 'del', 'la', 'el', 'los', 'las', 'con', 'para']);
      const keywords = Array.from(new Set(
        trimmedFilter.toLowerCase().match(/[a-z0-9áéíóúüñ_-]{2,}/gi) || []
      )).filter(token => !stopwords.has(token));
      if (!keywords.length) return [];
      return steps.filter(step => {
        const lowerStep = step.toLowerCase();
        return keywords.some(keyword => lowerStep.includes(keyword));
      });
    }

    function buildWorkspaceThreeConversationText(messages) {
      return messages
        .filter(message => !isTemporalMessageExpired(message))
        .map(message => {
          const raw = String(message.text || '').trim();
          const label = message.role === 'user' ? 'Usuario' : 'Asistente';
          return label + ': ' + raw;
        })
        .join('\n\n');
    }

    function getWorkspaceThreePinnedContextMessageIds(messages, pinnedMessageIds) {
      const includedIndexes = new Set();
      const pinnedIdSet = new Set(Array.isArray(pinnedMessageIds) ? pinnedMessageIds : []);
      messages.forEach((message, index) => {
        if (!message || !pinnedIdSet.has(message.id) || isTemporalMessageExpired(message)) return;
        if (message.role === 'assistant') {
          const prev = messages[index - 1];
          if (prev && prev.role === 'user' && !isTemporalMessageExpired(prev)) includedIndexes.add(index - 1);
          includedIndexes.add(index);
          return;
        }
        includedIndexes.add(index);
        const next = messages[index + 1];
        if (next && next.role === 'assistant' && !isTemporalMessageExpired(next)) includedIndexes.add(index + 1);
      });
      return Array.from(includedIndexes).sort((a, b) => a - b).map(index => messages[index]?.id).filter(id => id != null);
    }

    function buildWorkspaceThreePinnedConversationText(messages, pinnedMessageIds) {
      const includedIds = new Set(getWorkspaceThreePinnedContextMessageIds(messages, pinnedMessageIds));
      return messages
        .filter(message => includedIds.has(message.id) && !isTemporalMessageExpired(message))
        .map(message => {
          const raw = String(message.text || '').trim();
          const label = message.role === 'user' ? 'Usuario' : 'Asistente';
          return label + ': ' + raw;
        })
        .join('\n\n');
    }

    function clearWorkspaceThreeMessages(state) {
      state.messages.forEach(message => {
        if (message.timerId) clearTimeout(message.timerId);
        if (message.el && message.el.parentNode) message.el.parentNode.removeChild(message.el);
      });
      state.messages = [];
      state.nextMessageId = 0;
      state.searchMatchIds = [];
      state.searchCurrent = -1;
      if (state.searchHighlightedEl) {
        state.searchHighlightedEl.classList.remove('search-active');
        state.searchHighlightedEl = null;
      }
    }

    function getWorkspaceThreeMessagesData(state) {
      return state.messages
        .map(serializeWorkspaceThreeMessage)
        .filter(Boolean);
    }

    function restoreWorkspaceThreeMessages(state, messagesData) {
      clearWorkspaceThreeMessages(state);
      (Array.isArray(messagesData) ? messagesData : []).forEach(message => {
        addWorkspaceThreeMessage(state, message.role || 'assistant', message.text || '', {
          messageId: Number.isFinite(Number(message.id)) ? Number(message.id) : undefined,
          htmlContent: message.display || null,
          isSummary: Boolean(message.isSummary),
          expiresAt: message.expiresAt || null
        });
      });
      refreshWorkspaceThreeHistoryMenu(state);
      state.body.scrollTop = state.body.scrollHeight;
    }

    function createWorkspaceThreeVersionSnapshot(state) {
      const chatVersions = Array.isArray(state.versions) ? state.versions : [];
      const versionNumber = chatVersions.length + 1;
      const newVersionLabel = 'chat_v' + String(versionNumber).padStart(3, '0');
      const snapshot = {
        id: generateVersionId(),
        label: newVersionLabel,
        createdAt: Date.now(),
        messages: getWorkspaceThreeMessagesData(state),
        pinnedMessageIds: Array.isArray(state.pinnedMessageIds) ? state.pinnedMessageIds.slice() : [],
        sourceLabel: state.currentSourceLabel || null
      };
      state.versions = chatVersions;
      state.versions.push(snapshot);
      return snapshot;
    }

    function buildWorkspaceThreeVersionPrompt(state, includeCurrent) {
      const orderedVersions = (Array.isArray(state.versions) ? state.versions.slice() : [])
        .sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0));
      const entries = [];
      const lines = [];
      if (includeCurrent) {
        lines.push('0. Conversación actual');
        entries.push({ type: 'current', value: null });
      }
      orderedVersions.forEach((version, index) => {
        const rowNumber = includeCurrent ? index + 1 : index + 1;
        const lineage = version.sourceLabel ? (' [' + version.sourceLabel + ' -> ' + version.label + ']') : '';
        lines.push(rowNumber + '. ' + version.label + lineage);
        entries.push({ type: 'version', value: version });
      });
      return { entries, lines };
    }

    async function handleWorkspaceThreeResumenCommand(state, scope) {
      const activeMessages = state.messages.filter(message => !isTemporalMessageExpired(message));
      let transcript = '';
      if (scope === 'general') {
        if (!activeMessages.length) {
          window.alert('No hay mensajes en este chat para resumir.');
          return;
        }
        transcript = buildWorkspaceThreeConversationText(activeMessages);
      } else {
        const hasPinned = activeMessages.some(message => state.pinnedMessageIds.includes(message.id));
        if (!hasPinned) {
          window.alert('No hay mensajes anclados en este chat para resumir.');
          return;
        }
        transcript = buildWorkspaceThreePinnedConversationText(activeMessages, state.pinnedMessageIds);
      }
      const engineName = engineLabel(selectedEngine);
      const activeKey = getEngineKey(selectedEngine);
      if (!activeKey) {
        window.alert('Conecta tu API key de ' + engineName + ' para generar el resumen.');
        return;
      }
      const previousPlaceholder = state.input.placeholder;
      state.sending = true;
      state.input.disabled = true;
      state.sendBtn.disabled = true;
      state.input.placeholder = 'Generando resumen...';
      try {
        const summaryInstruction = 'Resume la siguiente conversación siguiendo EXACTAMENTE esta plantilla de formato:\n\n'
          + '[Párrafo breve de 1-2 frases con la intención general de la conversación, de qué se trata todo]\n\n'
          + '- [Punto o paso 1, redactado como intención/acción directa, ej: "Instalar imagen de YOLOv5"]\n'
          + '```\n[comando exacto si el punto 1 tiene uno, en su propia línea, nunca mezclado con el texto]\n```\n'
          + '- [Punto o paso 2]\n'
          + '```\n[comando del punto 2, si aplica]\n```\n\n'
          + 'Reglas: cada bloque de comando va SIEMPRE en su propia línea encerrado entre triple backtick (```), nunca dentro de la misma línea del punto ni como texto plano. '
          + 'Si un punto no tiene comando, omite el bloque para ese punto. '
          + 'No uses el formato "Usuario: ..." ni "Asistente: ...". '
          + 'No incluyas comentarios sobre lo que hizo el asistente si no aportan información nueva (por ejemplo, evita frases como "Asistente: proporciona el comando").\n\n'
          + 'Conversación a resumir:\n\n';
        const reply = await callSelectedEngine([
          { role: 'user', content: summaryInstruction + transcript }
        ], activeKey);
        const snapshot = createWorkspaceThreeVersionSnapshot(state);
        restoreWorkspaceThreeMessages(state, [{
          role: 'assistant',
          text: reply,
          display: formatMarkdown(reply),
          isSummary: true
        }]);
        state.pinnedMessageIds = [];
        state.viewingVersionId = null;
        state.currentSourceLabel = snapshot.label;
        renderWorkspaceThreeMiniChat(state);
        saveWorkspaceThreeToStorage();
      } catch (error) {
        window.alert('No se pudo generar el resumen: ' + (error && error.message ? error.message : 'error desconocido'));
      } finally {
        state.sending = false;
        state.input.disabled = false;
        state.sendBtn.disabled = false;
        state.input.placeholder = previousPlaceholder;
      }
    }

    function handleWorkspaceThreeVersionsCommand(state) {
      const promptData = buildWorkspaceThreeVersionPrompt(state, false);
      if (!promptData.entries.length) {
        window.alert('No hay versiones guardadas en este chat.');
        return;
      }
      const rawSelection = window.prompt(
        'Selecciona una versión para cargar en este chat:\n\n' + promptData.lines.join('\n'),
        '1'
      );
      if (rawSelection == null) return;
      const entryIndex = Number(rawSelection) - 1;
      const target = promptData.entries[entryIndex];
      if (!target || target.type !== 'version' || !target.value) {
        window.alert('Selección inválida.');
        return;
      }
      const version = target.value;
      const hasCurrentMessages = state.messages.some(message => !isTemporalMessageExpired(message));
      if (hasCurrentMessages && !state.viewingVersionId) {
        createWorkspaceThreeVersionSnapshot(state);
      }
      restoreWorkspaceThreeMessages(state, version.messages || []);
      state.pinnedMessageIds = Array.isArray(version.pinnedMessageIds) ? version.pinnedMessageIds.slice() : [];
      state.viewingVersionId = version.id || null;
      state.currentSourceLabel = version.label || null;
      renderWorkspaceThreeMiniChat(state);
      saveWorkspaceThreeToStorage();
    }

    function handleWorkspaceThreeDeleteCommand(state) {
      const promptData = buildWorkspaceThreeVersionPrompt(state, true);
      if (!promptData.entries.length) {
        window.alert('No hay conversación ni versiones disponibles para eliminar.');
        return;
      }
      const rawSelection = window.prompt(
        'Selecciona qué deseas eliminar:\n\n' + promptData.lines.join('\n'),
        '0'
      );
      if (rawSelection == null) return;
      const selection = Number(rawSelection);
      const target = selection === 0 ? promptData.entries[0] : promptData.entries[selection];
      if (!target) {
        window.alert('Selección inválida.');
        return;
      }
      if (target.type === 'current') {
        if (!window.confirm('¿Eliminar permanentemente la conversación actual de este chat?')) return;
        restoreWorkspaceThreeMessages(state, []);
        state.pinnedMessageIds = [];
        state.viewingVersionId = null;
        state.currentSourceLabel = null;
        renderWorkspaceThreeMiniChat(state);
        saveWorkspaceThreeToStorage();
        return;
      }
      const version = target.value;
      if (!version) return;
      if (!window.confirm('¿Eliminar permanentemente ' + (version.label || 'esta versión') + '?')) return;
      state.versions = (Array.isArray(state.versions) ? state.versions : []).filter(item => item.id !== version.id);
      if (state.viewingVersionId === version.id) state.viewingVersionId = null;
      saveWorkspaceThreeToStorage();
    }

    async function buildBranchPlanFromWorkspaceThreeState(state, branchFilter = '') {
      const activeMessages = state.messages.filter(message => !isTemporalMessageExpired(message));
      const lastAssistantMessage = [...activeMessages].reverse().find(message => message.role === 'assistant');
      if (!lastAssistantMessage) {
        throw new Error('Necesito un último mensaje del asistente con pasos para crear las ramas.');
      }

      const transcript = buildWorkspaceThreeConversationText(activeMessages);
      const lastAssistantText = String(lastAssistantMessage.text || '').trim();
      const contextPrefix = state.contextMessage?.rawText ? ('Contexto fijo del chat:\n' + state.contextMessage.rawText + '\n\n') : '';
      const activeKey = getEngineKey(selectedEngine);
      const engineName = engineLabel(selectedEngine);
      if (!activeKey) {
        throw new Error('Conecta tu API key de ' + engineName + ' para usar comandos de ramas.');
      }
      const filterText = String(branchFilter || '').trim();
      const branchInstruction = 'Analiza esta conversación y el último mensaje del asistente. '
        + 'Responde SOLO con JSON válido, sin markdown, con esta forma exacta: '
        + '{"summary":"resumen breve y operativo del chat, enfocado en ejecutar el último mensaje","steps":["paso 1","paso 2"]}. '
        + 'Reglas: el summary debe condensar el contexto útil de toda la conversación. '
        + 'La lista steps debe salir del último mensaje del asistente, en el mismo orden, normalizando redacción solo si ayuda. '
        + 'Si un paso incluye comandos o subinstrucciones, mantenlos dentro del mismo string usando saltos de línea. '
        + 'No inventes pasos extra si no están implícitos de forma clara en el último mensaje. '
        + 'Si el usuario entrega un filtro o criterio, devuelve SOLO los pasos que cumplan ese criterio y enfoca el summary en esos pasos.';

      const reply = await callSelectedEngine([
        {
          role: 'user',
          content: branchInstruction
            + '\n\n'
            + (filterText ? ('Filtro solicitado por el usuario para ramificar:\n' + filterText + '\n\n') : '')
            + contextPrefix
            + 'Conversación completa:\n'
            + transcript
            + '\n\nÚltimo mensaje del asistente:\n'
            + lastAssistantText
        }
      ], activeKey);

      const parsed = extractJsonObjectFromText(reply) || {};
      const summary = String(parsed.summary || '').trim();
      const fallbackSteps = filterText
        ? applyBranchFilterToSteps(extractOrderedStepsFromText(lastAssistantText), filterText)
        : extractOrderedStepsFromText(lastAssistantText);
      const parsedSteps = normalizeBranchSteps(parsed.steps, '');
      const steps = parsedSteps.length ? parsedSteps : fallbackSteps;
      if (!steps.length) {
        throw new Error(filterText
          ? 'No encontré pasos que coincidan con ese filtro para el comando de ramas.'
          : 'No pude extraer pasos accionables del último mensaje del asistente.');
      }
      return {
        summary: summary || 'Resumen operativo no disponible.',
        steps,
        filterText,
        rawModelReply: reply,
        lastAssistantText
      };
    }

    function getWorkspaceThreeInlineBranchLayout(sourceState, stepCount) {
      const childSpacing = 240;
      const totalHeight = Math.max(0, (stepCount - 1) * childSpacing);
      const sourceX = Number(sourceState.element?.dataset?.x || 180);
      const sourceY = Number(sourceState.element?.dataset?.y || 140);
      const canvasWidth = workspaceThreeCanvas?.clientWidth || 1800;
      const canvasHeight = workspaceThreeCanvas?.clientHeight || 1200;
      const existingChildren = (sourceState.connections || [])
        .filter(connection => connection?._workspaceThreeSourceState === sourceState)
        .map(connection => connection?._workspaceThreeTargetState)
        .filter(childState => childState && !childState.closed);

      let childX = clampWorkspaceThreeValue(sourceX + 700, sourceX + 420, Math.max(sourceX + 420, canvasWidth - 520));
      let startY;
      if (existingChildren.length) {
        const maxChildX = existingChildren.reduce((max, childState) => {
          const x = Number(childState.element?.dataset?.x || childX);
          return Math.max(max, x);
        }, childX);
        const maxChildY = existingChildren.reduce((max, childState) => {
          const y = Number(childState.element?.dataset?.y || sourceY);
          return Math.max(max, y);
        }, sourceY);
        childX = clampWorkspaceThreeValue(maxChildX, sourceX + 420, Math.max(sourceX + 420, canvasWidth - 520));
        startY = clampWorkspaceThreeValue(maxChildY + 260, 120, Math.max(120, canvasHeight - totalHeight - 180));
      } else {
        startY = clampWorkspaceThreeValue(sourceY - (totalHeight / 2), 120, Math.max(120, canvasHeight - totalHeight - 180));
      }
      return {
        childX,
        childSpacing,
        startY
      };
    }

    function getBranchModeMeta(mode) {
      return mode === 'sequential'
        ? { command: '/ramas-secuenciales', label: 'secuenciales' }
        : { command: '/ramas-paralelas', label: 'paralelas' };
    }

    function getWorkspaceThreeInlineSequentialBranchLayout(sourceState) {
      const stepSpacing = 560;
      const sourceX = Number(sourceState.element?.dataset?.x || 180);
      const sourceY = Number(sourceState.element?.dataset?.y || 140);
      const canvasWidth = workspaceThreeCanvas?.clientWidth || 1800;
      const canvasHeight = workspaceThreeCanvas?.clientHeight || 1200;
      const existingChildren = (sourceState.connections || [])
        .filter(connection => connection?._workspaceThreeSourceState === sourceState)
        .map(connection => connection?._workspaceThreeTargetState)
        .filter(childState => childState && !childState.closed);
      const initialStartX = clampWorkspaceThreeValue(sourceX + 700, sourceX + 420, Math.max(sourceX + 420, canvasWidth - 520));
      const maxChildX = existingChildren.reduce((max, childState) => {
        const x = Number(childState.element?.dataset?.x || initialStartX);
        return Math.max(max, x);
      }, initialStartX - stepSpacing);
      const startX = existingChildren.length
        ? clampWorkspaceThreeValue(maxChildX + stepSpacing, sourceX + 420, Math.max(sourceX + 420, canvasWidth - 520))
        : initialStartX;
      return {
        startX,
        stepSpacing,
        y: clampWorkspaceThreeValue(sourceY, 120, Math.max(120, canvasHeight - 180))
      };
    }

    function getWorkspaceThreeSequentialBranchOrigin(stepCount, ownerChatName) {
      const ownerChats = workspaceThreeMiniChats.filter(item => !item.closed && item.ownerChatName === ownerChatName);
      const stepSpacing = 560;
      const totalNodes = stepCount + 1;
      const chainWidth = Math.max(0, (totalNodes - 1) * stepSpacing);
      const canvasWidth = workspaceThreeCanvas?.clientWidth || 1800;
      const canvasHeight = workspaceThreeCanvas?.clientHeight || 1200;
      if (!ownerChats.length) {
        const center = getWorkspaceThreeViewportCenter();
        return {
          x: clampWorkspaceThreeValue(center.x - (chainWidth / 2), 120, Math.max(120, canvasWidth - 520 - chainWidth)),
          y: clampWorkspaceThreeValue(center.y - 60, 120, Math.max(120, canvasHeight - 180)),
          stepSpacing
        };
      }
      const maxY = ownerChats.reduce((max, item) => {
        const y = Number(item.element?.dataset?.y || 140);
        return Math.max(max, y);
      }, 140);
      return {
        x: 180,
        y: clampWorkspaceThreeValue(maxY + 340, 120, Math.max(120, canvasHeight - 180)),
        stepSpacing
      };
    }

    async function handleWorkspaceThreeBranchCommand(sourceState, branchFilter = '', mode = 'parallel') {
      const plan = await buildBranchPlanFromWorkspaceThreeState(sourceState, branchFilter);
      const isSequential = mode === 'sequential';
      const branchLayout = isSequential
        ? getWorkspaceThreeInlineSequentialBranchLayout(sourceState)
        : getWorkspaceThreeInlineBranchLayout(sourceState, plan.steps.length);
      let previousState = sourceState;
      plan.steps.forEach((step, index) => {
        const stepLabel = extractWorkspaceThreeIntentLabel(step, index);
        const stepTitle = stepLabel === ('Paso ' + (index + 1))
          ? stepLabel
          : ('Paso ' + (index + 1) + ' - ' + stepLabel);
        const childContext = (plan.filterText ? ('Filtro aplicado:\n' + plan.filterText + '\n\n') : '')
          + 'Resumen base:\n'
          + plan.summary
          + '\n\nPaso asignado:\n'
          + ((index + 1) + '. ' + step);
        const childState = createWorkspaceThreeMiniChatNode({
          id: 'workspace-three-inline-branch-child-' + Date.now() + '-' + index,
          name: stepTitle,
          title: stepTitle,
          subtitle: sourceState.titleStrong?.textContent || sourceState.name || 'Workspace Three',
          ownerChatId: sourceState.ownerChatId || null,
          ownerChatName: sourceState.ownerChatName || null,
          x: isSequential ? (branchLayout.startX + (index * branchLayout.stepSpacing)) : branchLayout.childX,
          y: isSequential ? branchLayout.y : (branchLayout.startY + (index * branchLayout.childSpacing)),
          assistantPrefix: 'Paso ' + (index + 1) + ' recibió: ',
          inputPlaceholder: 'Desarrolla este paso...',
          contextMessage: {
            rawText: childContext,
            display: formatWorkspaceThreeContextHtml(childContext)
          },
          seedMessages: [
            {
              role: 'assistant',
              text: step,
              htmlContent: formatMarkdown(step)
            }
          ]
        });
        if (childState) {
          connectWorkspaceThreeNodes(previousState, childState);
          if (isSequential) previousState = childState;
        }
      });
      saveWorkspaceThreeToStorage();
    }

    async function buildBranchPlanFromChat(chat, branchFilter = '') {
      const activeMessages = chat.messages.filter(message => !message.typing && !isTemporalMessageExpired(message));
      const lastAssistantMessage = [...activeMessages].reverse().find(message => message.role === 'assistant');
      if (!lastAssistantMessage) {
        throw new Error('Necesito un último mensaje del asistente con pasos para crear las ramas.');
      }

      const transcript = buildFullConversationText(activeMessages);
      const lastAssistantText = (lastAssistantMessage.rawText || lastAssistantMessage.content || '').trim();
      const contextPrefix = chat.contextMessage?.content ? ('Contexto fijo del chat:\n' + chat.contextMessage.content + '\n\n') : '';
      const activeKey = getEngineKey(selectedEngine);
      const engineName = engineLabel(selectedEngine);
      if (!activeKey) {
        throw new Error('Conecta tu API key de ' + engineName + ' para usar comandos de ramas.');
      }
      const filterText = String(branchFilter || '').trim();

      const branchInstruction = 'Analiza esta conversación y el último mensaje del asistente. '
        + 'Responde SOLO con JSON válido, sin markdown, con esta forma exacta: '
        + '{"summary":"resumen breve y operativo del chat, enfocado en ejecutar el último mensaje","steps":["paso 1","paso 2"]}. '
        + 'Reglas: el summary debe condensar el contexto útil de toda la conversación. '
        + 'La lista steps debe salir del último mensaje del asistente, en el mismo orden, normalizando redacción solo si ayuda. '
        + 'Si un paso incluye comandos o subinstrucciones, mantenlos dentro del mismo string usando saltos de línea. '
        + 'No inventes pasos extra si no están implícitos de forma clara en el último mensaje. '
        + 'Si el usuario entrega un filtro o criterio, devuelve SOLO los pasos que cumplan ese criterio y enfoca el summary en esos pasos.';

      const reply = await callSelectedEngine([
        {
          role: 'user',
          content: branchInstruction
            + '\n\n'
            + (filterText ? ('Filtro solicitado por el usuario para ramificar:\n' + filterText + '\n\n') : '')
            + contextPrefix
            + 'Conversación completa:\n'
            + transcript
            + '\n\nÚltimo mensaje del asistente:\n'
            + lastAssistantText
        }
      ], activeKey);

      const parsed = extractJsonObjectFromText(reply) || {};
      const summary = String(parsed.summary || '').trim();
      const fallbackSteps = filterText
        ? applyBranchFilterToSteps(extractOrderedStepsFromText(lastAssistantText), filterText)
        : extractOrderedStepsFromText(lastAssistantText);
      const parsedSteps = normalizeBranchSteps(parsed.steps, '');
      const steps = parsedSteps.length ? parsedSteps : fallbackSteps;
      if (!steps.length) {
        throw new Error(filterText
          ? 'No encontré pasos que coincidan con ese filtro para el comando de ramas.'
          : 'No pude extraer pasos accionables del último mensaje del asistente.');
      }
      return {
        summary: summary || 'Resumen operativo no disponible.',
        steps,
        filterText,
        rawModelReply: reply,
        lastAssistantText
      };
    }

    async function handleBranchCommand(chat, branchFilter = '', mode = 'parallel') {
      const branchMeta = getBranchModeMeta(mode);
      const isSequential = mode === 'sequential';
      chat.statusMessage = 'Generando ramas ' + branchMeta.label + '...';
      renderChats();

      const plan = await buildBranchPlanFromChat(chat, branchFilter);
      const isFirstBranchLayout = !workspaceThreeMiniChats.some(item => !item.closed && item.ownerChatName === chat.name);
      const childSpacing = isFirstBranchLayout ? 300 : 240;
      const branchOrigin = isSequential
        ? getWorkspaceThreeSequentialBranchOrigin(plan.steps.length, chat.name)
        : getWorkspaceThreeBranchOrigin(plan.steps.length, chat.name, childSpacing);
      const childX = isSequential ? null : (branchOrigin.x + (isFirstBranchLayout ? 760 : 700));
      const totalHeight = Math.max(0, (plan.steps.length - 1) * childSpacing);
      const parentY = isSequential ? branchOrigin.y : (branchOrigin.y + (totalHeight / 2));
      const stepsText = plan.steps.map((step, index) => (index + 1) + '. ' + step).join('\n\n');
      const parentContext = (plan.filterText ? ('Filtro aplicado:\n' + plan.filterText + '\n\n') : '')
        + 'Resumen del chat:\n'
        + plan.summary
        + '\n\nPasos recomendados del último mensaje:\n'
        + stepsText;

      const parentState = createWorkspaceThreeMiniChatNode({
        id: 'workspace-three-branch-parent-' + Date.now(),
        name: 'Ramas de ' + chat.name,
        title: 'Ramas de ' + chat.name,
        subtitle: 'Contexto base',
        ownerChatId: chat.id,
        ownerChatName: chat.name,
        x: branchOrigin.x,
        y: parentY,
        assistantPrefix: 'Nodo padre recibió: ',
        inputPlaceholder: 'Escribe para expandir esta rama...',
        contextMessage: {
          rawText: parentContext,
          display: formatWorkspaceThreeContextHtml(parentContext)
        },
        seedMessages: [
          {
            role: 'assistant',
            text: 'Se generaron ' + plan.steps.length + ' ramas desde el último mensaje recomendado.',
            htmlContent: formatMarkdown('Se generaron **' + plan.steps.length + '** ramas desde el último mensaje recomendado.')
          }
        ]
      });
      if (!parentState) {
        chat.statusMessage = null;
        throw new Error('No pude crear el nodo padre en Workspace Three.');
      }

      let previousState = parentState;
      plan.steps.forEach((step, index) => {
        const stepLabel = extractWorkspaceThreeIntentLabel(step, index);
        const stepTitle = stepLabel === ('Paso ' + (index + 1))
          ? stepLabel
          : ('Paso ' + (index + 1) + ' - ' + stepLabel);
        const childContext = (plan.filterText ? ('Filtro aplicado:\n' + plan.filterText + '\n\n') : '')
          + 'Resumen base:\n'
          + plan.summary
          + '\n\nPaso asignado:\n'
          + ((index + 1) + '. ' + step);
        const childState = createWorkspaceThreeMiniChatNode({
          id: 'workspace-three-branch-child-' + Date.now() + '-' + index,
          name: stepTitle,
          title: stepTitle,
          subtitle: 'Paso ' + (index + 1),
          ownerChatId: chat.id,
          ownerChatName: chat.name,
          x: isSequential ? (branchOrigin.x + ((index + 1) * branchOrigin.stepSpacing)) : childX,
          y: isSequential ? branchOrigin.y : (branchOrigin.y + (index * childSpacing)),
          assistantPrefix: 'Paso ' + (index + 1) + ' recibió: ',
          inputPlaceholder: 'Desarrolla este paso...',
          contextMessage: {
            rawText: childContext,
            display: formatWorkspaceThreeContextHtml(childContext)
          },
          seedMessages: [
            {
              role: 'assistant',
              text: step,
              htmlContent: formatMarkdown(step)
            }
          ]
        });
        if (childState) {
          connectWorkspaceThreeNodes(isSequential ? previousState : parentState, childState);
          if (isSequential) previousState = childState;
        }
      });

      chat.statusMessage = null;
      chat.hasBranches = true;
      saveChatToStorage(chat);
      setWorkspaceThreeActiveChat(chat.id);
      setTemporaryChatStatus(chat, 'Se crearon ' + plan.steps.length + ' ramas ' + branchMeta.label + ' en Workspace Three.');
      workspaceThreeSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    async function handleMultiIaCommand(chat, promptText) {
      const prompt = String(promptText || '').trim();
      if (!prompt) {
        throw new Error('Escribe /multi-ia seguido de la solicitud que quieres enviar a los motores.');
      }
      if (chat.hasBranches) {
        throw new Error('Este chat ya contiene ramas asociadas.');
      }
      const activeMessages = chat.messages.filter(message => !message.typing && !isTemporalMessageExpired(message));
      if (!activeMessages.length) {
        throw new Error('No hay conversación previa para resumir antes de ejecutar /multi-ia.');
      }
      const configuredEngines = getConfiguredEngineEntries();
      if (!configuredEngines.length) {
        throw new Error('Necesitas al menos una API key configurada para usar /multi-ia.');
      }

      chat.statusMessage = 'Consultando múltiples motores IA...';
      renderChats();

      const transcript = buildFullConversationText(activeMessages);
      const contextPrefix = chat.contextMessage?.content ? ('Contexto fijo del chat:\n' + chat.contextMessage.content + '\n\n') : '';
      const summary = await generateChatSummaryWithCurrentEngine(contextPrefix + transcript);

      const engineMessages = configuredEngines.map(entry => {
        const userContent = 'Usa este resumen del chat como contexto de trabajo:\n\n'
          + summary
          + '\n\nSolicitud actual del usuario:\n'
          + prompt;
        return {
          entry,
          messages: [{ role: 'user', content: userContent }]
        };
      });

      const engineReplies = await Promise.all(engineMessages.map(async ({ entry, messages }) => {
        try {
          const reply = await callEngineByName(entry.engine, messages, entry.key);
          return {
            engine: entry.engine,
            label: entry.label,
            reply
          };
        } catch (error) {
          return {
            engine: entry.engine,
            label: entry.label,
            reply: 'No se pudo obtener respuesta de ' + entry.label + ': ' + (error && error.message ? error.message : 'error desconocido') + '.'
          };
        }
      }));

      const childSpacing = configuredEngines.length > 1 ? 260 : 220;
      const branchOrigin = getWorkspaceThreeBranchOrigin(configuredEngines.length, chat.name, childSpacing);
      const childX = branchOrigin.x + 760;
      const totalHeight = Math.max(0, (configuredEngines.length - 1) * childSpacing);
      const parentY = branchOrigin.y + (totalHeight / 2);
      const contextText = summary;
      const parentState = createWorkspaceThreeMiniChatNode({
        id: 'workspace-three-multi-ia-parent-' + Date.now(),
        name: 'Multi-IA de ' + chat.name,
        title: 'Multi-IA de ' + chat.name,
        subtitle: 'Contexto resumido',
        ownerChatId: chat.id,
        ownerChatName: chat.name,
        x: branchOrigin.x,
        y: parentY,
        assistantPrefix: 'Nodo multi-IA recibió: ',
        inputPlaceholder: 'Continúa esta comparación...',
        contextMessage: {
          rawText: contextText,
          display: formatWorkspaceThreeContextHtml(contextText)
        },
        seedMessages: [
          {
            role: 'assistant',
            text: 'Solicitud enviada a ' + configuredEngines.length + ' motor(es): ' + prompt,
            htmlContent: formatMarkdown('**Solicitud multi-IA:** ' + prompt + '\n\nMotores consultados: ' + configuredEngines.map(entry => entry.label).join(', '))
          }
        ]
      });
      if (!parentState) {
        chat.statusMessage = null;
        throw new Error('No pude crear el nodo padre de /multi-ia en Workspace Three.');
      }

      engineReplies.forEach((result, index) => {
        const childContext = 'Resumen del chat:\n'
          + summary
          + '\n\nSolicitud original del usuario:\n'
          + prompt
          + '\n\nMotor asignado:\n'
          + result.label;
        const childState = createWorkspaceThreeMiniChatNode({
          id: 'workspace-three-multi-ia-child-' + Date.now() + '-' + index,
          name: result.label,
          title: result.label,
          subtitle: 'Respuesta multi-IA',
          ownerChatId: chat.id,
          ownerChatName: chat.name,
          x: childX,
          y: branchOrigin.y + (index * childSpacing),
          assistantPrefix: result.label + ' respondió: ',
          inputPlaceholder: 'Continúa con ' + result.label + '...',
          contextMessage: {
            rawText: childContext,
            display: formatWorkspaceThreeContextHtml(childContext)
          },
          seedMessages: [
            {
              role: 'assistant',
              text: result.reply,
              htmlContent: formatMarkdown(result.reply)
            }
          ]
        });
        if (childState) connectWorkspaceThreeNodes(parentState, childState);
      });

      chat.statusMessage = null;
      chat.hasBranches = true;
      saveChatToStorage(chat);
      setWorkspaceThreeActiveChat(chat.id);
      setTemporaryChatStatus(chat, 'Se generó una comparación multi-IA con ' + configuredEngines.length + ' motor(es).');
      workspaceThreeSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    async function handleWorkspaceThreeMultiIaCommand(sourceState, promptText) {
      const prompt = String(promptText || '').trim();
      if (!prompt) {
        throw new Error('Escribe /multi-ia seguido de la solicitud que quieres enviar a los motores.');
      }
      const activeMessages = sourceState.messages.filter(message => !isTemporalMessageExpired(message));
      if (!activeMessages.length) {
        throw new Error('No hay conversación previa en este chat para resumir antes de ejecutar /multi-ia.');
      }
      const configuredEngines = getConfiguredEngineEntries();
      if (!configuredEngines.length) {
        throw new Error('Necesitas al menos una API key configurada para usar /multi-ia.');
      }

      const transcript = buildWorkspaceThreeConversationText(activeMessages);
      const contextPrefix = sourceState.contextMessage?.rawText ? ('Contexto fijo del chat:\n' + sourceState.contextMessage.rawText + '\n\n') : '';
      const summary = await generateChatSummaryWithCurrentEngine(contextPrefix + transcript);
      const branchLayout = getWorkspaceThreeInlineBranchLayout(sourceState, configuredEngines.length);
      const canvasWidth = workspaceThreeCanvas?.clientWidth || 1800;
      const totalHeight = Math.max(0, (configuredEngines.length - 1) * branchLayout.childSpacing);
      const parentX = branchLayout.childX;
      const parentY = branchLayout.startY + (totalHeight / 2);
      const childX = clampWorkspaceThreeValue(parentX + 700, parentX + 420, Math.max(parentX + 420, canvasWidth - 520));

      const parentState = createWorkspaceThreeMiniChatNode({
        id: 'workspace-three-inline-multi-ia-parent-' + Date.now(),
        name: 'Multi-IA de ' + (sourceState.name || 'Workspace Three'),
        title: 'Multi-IA de ' + (sourceState.name || 'Workspace Three'),
        subtitle: 'Contexto resumido',
        ownerChatId: sourceState.ownerChatId || null,
        ownerChatName: sourceState.ownerChatName || null,
        x: parentX,
        y: parentY,
        assistantPrefix: 'Nodo multi-IA recibió: ',
        inputPlaceholder: 'Continúa esta comparación...',
        contextMessage: {
          rawText: summary,
          display: formatWorkspaceThreeContextHtml(summary)
        },
        seedMessages: [
          {
            role: 'assistant',
            text: 'Solicitud enviada a ' + configuredEngines.length + ' motor(es): ' + prompt,
            htmlContent: formatMarkdown('**Solicitud multi-IA:** ' + prompt + '\n\nMotores consultados: ' + configuredEngines.map(entry => entry.label).join(', '))
          }
        ]
      });
      if (!parentState) {
        throw new Error('No pude crear el nodo padre de /multi-ia en Workspace Three.');
      }
      connectWorkspaceThreeNodes(sourceState, parentState);

      const engineReplies = await Promise.all(configuredEngines.map(async (entry) => {
        try {
          const reply = await callEngineByName(entry.engine, [{
            role: 'user',
            content: 'Usa este resumen del chat como contexto de trabajo:\n\n'
              + summary
              + '\n\nSolicitud actual del usuario:\n'
              + prompt
          }], entry.key);
          return {
            label: entry.label,
            reply
          };
        } catch (error) {
          return {
            label: entry.label,
            reply: 'No se pudo obtener respuesta de ' + entry.label + ': ' + (error && error.message ? error.message : 'error desconocido') + '.'
          };
        }
      }));

      engineReplies.forEach((result, index) => {
        const childContext = 'Resumen del chat:\n'
          + summary
          + '\n\nSolicitud original del usuario:\n'
          + prompt
          + '\n\nMotor asignado:\n'
          + result.label;
        const childState = createWorkspaceThreeMiniChatNode({
          id: 'workspace-three-inline-multi-ia-child-' + Date.now() + '-' + index,
          name: result.label,
          title: result.label,
          subtitle: 'Respuesta multi-IA',
          ownerChatId: sourceState.ownerChatId || null,
          ownerChatName: sourceState.ownerChatName || null,
          x: childX,
          y: branchLayout.startY + (index * branchLayout.childSpacing),
          assistantPrefix: result.label + ' respondió: ',
          inputPlaceholder: 'Continúa con ' + result.label + '...',
          contextMessage: {
            rawText: childContext,
            display: formatWorkspaceThreeContextHtml(childContext)
          },
          seedMessages: [
            {
              role: 'assistant',
              text: result.reply,
              htmlContent: formatMarkdown(result.reply)
            }
          ]
        });
        if (childState) connectWorkspaceThreeNodes(parentState, childState);
      });

      saveWorkspaceThreeToStorage();
    }

    async function handleResumenCommand(chat, scope) {
      const chatVersions = Array.isArray(chat.versions) ? chat.versions : [];
      const viewingVersion = chat.viewingVersionId ? chatVersions.find(v => v.id === chat.viewingVersionId) : null;
      const activeMessages = viewingVersion ? viewingVersion.messages : chat.messages;
      const activePinnedIndices = viewingVersion ? (viewingVersion.pinnedIndices || []) : chat.pinnedIndices;

      let transcript;
      if (scope === 'general') {
        const hasMessages = activeMessages.some(message => !message.typing && !isTemporalMessageExpired(message));
        if (!hasMessages) {
          window.alert('No hay mensajes en la conversación para resumir.');
          return;
        }
        transcript = buildFullConversationText(activeMessages);
      } else {
        const hasPinned = activePinnedIndices.some(idx => activeMessages[idx] && !activeMessages[idx].typing && !isTemporalMessageExpired(activeMessages[idx]));
        if (!hasPinned) {
          window.alert('No hay mensajes anclados para resumir.');
          return;
        }
        transcript = buildPinnedConversationText(activeMessages, activePinnedIndices);
      }
      const engineName = engineLabel(selectedEngine);
      const activeKey = getEngineKey(selectedEngine);
      if (!activeKey) {
        window.alert('Conecta tu API key de ' + engineName + ' para generar el resumen.');
        return;
      }
      chat.statusMessage = 'Generando resumen...';
      renderChats();
      try {
        const summaryInstruction = 'Resume la siguiente conversación siguiendo EXACTAMENTE esta plantilla de formato:\n\n'
          + '[Párrafo breve de 1-2 frases con la intención general de la conversación, de qué se trata todo]\n\n'
          + '- [Punto o paso 1, redactado como intención/acción directa, ej: "Instalar imagen de YOLOv5"]\n'
          + '```\n[comando exacto si el punto 1 tiene uno, en su propia línea, nunca mezclado con el texto]\n```\n'
          + '- [Punto o paso 2]\n'
          + '```\n[comando del punto 2, si aplica]\n```\n\n'
          + 'Reglas: cada bloque de comando va SIEMPRE en su propia línea encerrado entre triple backtick (```), nunca dentro de la misma línea del punto ni como texto plano. '
          + 'Si un punto no tiene comando, omite el bloque para ese punto. '
          + 'No uses el formato "Usuario: ..." ni "Asistente: ...". '
          + 'No incluyas comentarios sobre lo que hizo el asistente si no aportan información nueva (por ejemplo, evita frases como "Asistente: proporciona el comando").\n\n'
          + 'Conversación a resumir:\n\n';
        const engineMessages = [
          { role: 'user', content: summaryInstruction + transcript }
        ];
        let reply;
        if (selectedEngine === 'gemini') reply = await callGemini(engineMessages, activeKey);
        else if (selectedEngine === 'groq') reply = await callGroq(engineMessages, activeKey);
        else if (selectedEngine === 'deepseek') reply = await callDeepSeek(engineMessages, activeKey);
        else reply = await callOpenAI(engineMessages, activeKey);

        const versionNumber = chatVersions.length + 1;
        const newVersionLabel = 'chat_v' + String(versionNumber).padStart(3, '0');
        chat.versions = chatVersions;
        chat.versions.push({
          id: generateVersionId(),
          label: newVersionLabel,
          createdAt: Date.now(),
          messages: chat.messages.filter(message => !message.typing),
          pinnedIndices: chat.pinnedIndices.slice(),
          sourceLabel: chat.currentSourceLabel || null
        });
        chat.messages = [{
          role: 'assistant',
          isSummary: true,
          content: reply,
          display: formatMarkdown(reply),
          rawText: reply
        }];
        chat.pinnedIndices = [];
        chat.expandedIndices = [];
        chat.viewingVersionId = null;
        chat.currentSourceLabel = viewingVersion ? viewingVersion.label : newVersionLabel;
        chat.statusMessage = null;
        saveChatToStorage(chat);
        renderChats();
      } catch (error) {
        chat.statusMessage = null;
        renderChats();
        window.alert('No se pudo generar el resumen: ' + (error && error.message ? error.message : 'error desconocido'));
      }
    }

    async function buildChatSummaryText(chat, scope) {
      const chatVersions = Array.isArray(chat.versions) ? chat.versions : [];
      const viewingVersion = chat.viewingVersionId ? chatVersions.find(v => v.id === chat.viewingVersionId) : null;
      const activeMessages = viewingVersion ? viewingVersion.messages : chat.messages;
      const activePinnedIndices = viewingVersion ? (viewingVersion.pinnedIndices || []) : chat.pinnedIndices;

      let transcript;
      if (scope === 'general') {
        const hasMessages = activeMessages.some(message => !message.typing && !isTemporalMessageExpired(message));
        if (!hasMessages) throw new Error('No hay mensajes en la conversación para resumir.');
        transcript = buildFullConversationText(activeMessages);
      } else {
        const hasPinned = activePinnedIndices.some(idx => activeMessages[idx] && !activeMessages[idx].typing && !isTemporalMessageExpired(activeMessages[idx]));
        if (!hasPinned) throw new Error('No hay mensajes anclados para resumir.');
        transcript = buildPinnedConversationText(activeMessages, activePinnedIndices);
      }

      const engineName = engineLabel(selectedEngine);
      const activeKey = getEngineKey(selectedEngine);
      if (!activeKey) throw new Error('Conecta tu API key de ' + engineName + ' para generar el resumen.');

      const summaryInstruction = 'Resume la siguiente conversaciÃ³n siguiendo EXACTAMENTE esta plantilla de formato:\n\n'
        + '[PÃ¡rrafo breve de 1-2 frases con la intenciÃ³n general de la conversaciÃ³n, de quÃ© se trata todo]\n\n'
        + '- [Punto o paso 1, redactado como intenciÃ³n/acciÃ³n directa, ej: "Instalar imagen de YOLOv5"]\n'
        + '```\n[comando exacto si el punto 1 tiene uno, en su propia lÃ­nea, nunca mezclado con el texto]\n```\n'
        + '- [Punto o paso 2]\n'
        + '```\n[comando del punto 2, si aplica]\n```\n\n'
        + 'Reglas: cada bloque de comando va SIEMPRE en su propia lÃ­nea encerrado entre triple backtick (```), nunca dentro de la misma lÃ­nea del punto ni como texto plano. '
        + 'Si un punto no tiene comando, omite el bloque para ese punto. '
        + 'No uses el formato "Usuario: ..." ni "Asistente: ...". '
        + 'No incluyas comentarios sobre lo que hizo el asistente si no aportan informaciÃ³n nueva (por ejemplo, evita frases como "Asistente: proporciona el comando").\n\n'
        + 'ConversaciÃ³n a resumir:\n\n';
      const engineMessages = [
        { role: 'user', content: summaryInstruction + transcript }
      ];
      let reply;
      if (selectedEngine === 'gemini') reply = await callGemini(engineMessages, activeKey);
      else if (selectedEngine === 'groq') reply = await callGroq(engineMessages, activeKey);
      else if (selectedEngine === 'deepseek') reply = await callDeepSeek(engineMessages, activeKey);
      else reply = await callOpenAI(engineMessages, activeKey);
      return reply;
    }

    function handleDeleteVersionClick(chat, versionId) {
      const chatVersions = Array.isArray(chat.versions) ? chat.versions : [];
      if (!versionId) {
        if (!window.confirm('¿Eliminar permanentemente la versión actual? Esta acción es irreversible.')) return;
        chat.messages = [];
        chat.pinnedIndices = [];
        chat.expandedIndices = [];
        chat.currentSourceLabel = null;
        chat.statusMessage = 'Versión actual eliminada correctamente.';
      } else {
        const version = chatVersions.find(v => v.id === versionId);
        const label = version ? version.label : 'esta versión';
        if (!window.confirm('¿Eliminar permanentemente ' + label + '? Esta acción es irreversible.')) return;
        chat.versions = chatVersions.filter(v => v.id !== versionId);
        if (chat.viewingVersionId === versionId) chat.viewingVersionId = null;
        chat.statusMessage = label + ' eliminada correctamente.';
      }
      saveChatToStorage(chat);
      renderChats();
      setTimeout(() => {
        chat.statusMessage = null;
        renderChats();
      }, 3000);
    }

    async function runConsoleCommand(chat, command) {
      if (command === 'resumen-anclados') {
        await handleResumenCommand(chat, 'anclados');
      } else if (command === 'resumen-general') {
        await handleResumenCommand(chat, 'general');
      } else if (command === 'ramas-paralelas') {
        handleBranchCommandShortcut(chat, 'parallel');
      } else if (command === 'ramas-secuenciales') {
        handleBranchCommandShortcut(chat, 'sequential');
      } else if (command === 'multi-ia') {
        handleMultiIaCommandShortcut(chat);
      } else if (command === 'chatsversion') {
        chat.consoleShowVersions = true;
        chat.consoleShowDelete = false;
        renderChats();
      } else if (command === 'eliminar') {
        chat.consoleShowDelete = true;
        chat.consoleShowVersions = false;
        renderChats();
      } else if (command === 'contexto') {
        handleContextoCommand(chat);
      } else if (command === 'mensajes') {
        handleMensajesCommand(chat);
      } else if (command === 'rule') {
        handleRuleCommand(chat);
      } else if (command === 'powershell') {
        handlePowerShellCommand(chat);
      } else if (command === 'anclar-archivo') {
        handleAnclarArchivoCommand(chat);
      } else if (command === 'branch') {
        void handleBranchChatCommand(chat, '');
      } else if (command === 'preview') {
        handlePreviewCommand(chat);
      } else if (command === 'limpiar') {
        handleLimpiarCommand(chat);
      } else if (command === 'lienzo') {
        handleLienzoCommand(chat);
      } else if (command === 'indexar-archivo' || command === 'indexar-archivos') {
        handleIndexarArchivosCommand(chat);
      } else if (command === 'indexar-archivo-recursivo' || command === 'indexar-archivos-recursivo') {
        handleIndexarArchivosRecursivoCommand(chat);
      }
    }

    function handleContextoCommand(chat) {
      chat.draftText = '/contexto /resumen-general #';
      renderChats();
      requestAnimationFrame(() => {
        const freshInput = document.querySelector('.chat-panel[data-chat-id="' + chat.id + '"] .chat-message-input');
        if (!freshInput) return;
        freshInput.focus();
        freshInput.value = chat.draftText;
        freshInput.dispatchEvent(new Event('input', { bubbles: true }));
        try {
          freshInput.setSelectionRange(freshInput.value.length, freshInput.value.length);
        } catch (error) { }
      });
    }

    function handleAnclarArchivoCommand(chat) {
      chat.draftText = '/anclar-archivo ';
      renderChats();
      requestAnimationFrame(() => {
        const freshInput = document.querySelector('.chat-panel[data-chat-id="' + chat.id + '"] .chat-message-input');
        if (!freshInput || freshInput.disabled) return;
        freshInput.focus();
        freshInput.value = chat.draftText;
        freshInput.dispatchEvent(new Event('input', { bubbles: true }));
        try {
          freshInput.setSelectionRange(freshInput.value.length, freshInput.value.length);
        } catch (error) { }
      });
    }

    function handleMensajesCommand(chat) {
      chat.draftText = '/mensajes:';
      renderChats();
      requestAnimationFrame(() => {
        const freshInput = document.querySelector('.chat-panel[data-chat-id="' + chat.id + '"] .chat-message-input');
        if (!freshInput) return;
        freshInput.focus();
        freshInput.value = chat.draftText;
        freshInput.dispatchEvent(new Event('input', { bubbles: true }));
        try {
          freshInput.setSelectionRange(freshInput.value.length, freshInput.value.length);
        } catch (error) { }
      });
    }

    function handleLimpiarCommand(chat) {
      chat.messages = [];
      chat.pinnedIndices = [];
      chat.expandedIndices = [];
      chat.replyingToIndex = null;
      chat.editingIndex = null;
      chat.attachment = null;
      chat.statusMessage = null;
      saveChatToStorage(chat);
      renderChats();
    }

    function ensureWorkspaceThreeChatNode(chat) {
      if (!chat?.id) return null;
      const existingState = workspaceThreeMiniChats.find(state => state && state.ownerChatId === chat.id && !state.closed) || null;
      if (existingState) {
        bringWorkspaceThreeChatToFront(existingState);
        return existingState;
      }

      const center = getWorkspaceThreeViewportCenter();
      const canvasWidth = workspaceThreeCanvas?.clientWidth || 1800;
      const canvasHeight = workspaceThreeCanvas?.clientHeight || 1200;
      const seedMessages = (Array.isArray(chat.messages) ? chat.messages : [])
        .filter(message => message && !message.typing && !message.isRule && !message.isPowerShell && !isTemporalMessageExpired(message))
        .map(message => ({
          role: message.role || 'assistant',
          text: String(message.rawText || message.content || '').trim(),
          htmlContent: message.display || null
        }))
        .filter(message => message.text);

      return createWorkspaceThreeMiniChatNode({
        id: 'workspace-three-chat-current-' + chat.id,
        name: chat.name || 'Chat actual',
        title: chat.name || 'Chat actual',
        subtitle: 'Chat actual',
        ownerChatId: chat.id,
        ownerChatName: chat.name || null,
        x: clampWorkspaceThreeValue(center.x - 260, 120, Math.max(120, canvasWidth - 520)),
        y: clampWorkspaceThreeValue(center.y - 120, 120, Math.max(120, canvasHeight - 180)),
        assistantPrefix: (chat.name || 'Chat actual') + ' recibió: ',
        inputPlaceholder: 'Continúa este chat...',
        contextMessage: chat.contextMessage ? cloneChatStateValue(chat.contextMessage) : null,
        seedMessages
      });
    }

    function handleLienzoCommand(chat) {
      if (!chat?.id) return;
      ensureWorkspaceThreeChatNode(chat);
      syncWorkspaceThreeBranchFlags();
      saveChatToStorage(chat);
      setWorkspaceThreeActiveChat(chat.id);
      requestAnimationFrame(() => {
        workspaceThreeSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    async function handleIndexarArchivosCommand(chat, filterText) {
      const selection = chat?.folderSelection || null;
      if (!selection) {
        setTemporaryChatStatus(chat, 'Primero selecciona una carpeta para indexar.', 4200);
        return '';
      }

      const filteredEntries = getIndexableFolderEntries(chat, filterText);
      if (!filteredEntries.length) {
        setTemporaryChatStatus(chat, 'No encontré archivos indexables para ese filtro.', 4200);
        return '';
      }
      const files = await readIndexableFolderEntries(chat, filteredEntries);

      const indexer = window.nanochatTsIndexer;
      if (!indexer || typeof indexer.buildFunctionGraph !== 'function') {
        setTemporaryChatStatus(chat, 'No está disponible el indexador local.', 4200);
        return '';
      }

      const graph = indexer.buildFunctionGraph(files, filterText);
      const summaryText = buildIndexTreeSummary(graph);
      const codeBlockText = '```text\n' + summaryText + '\n```';
      const replyMessage = {
        role: 'assistant',
        content: codeBlockText,
        display: formatIndexResultMarkdown(codeBlockText),
        rawText: summaryText,
        isIndexResult: true
      };
      chat.messages.push(replyMessage);
      saveChatToStorage(chat);
      renderChats();
      return summaryText;
    }

    async function handleIndexedResultChain(chat, chainText, resultText) {
      const normalizedChain = String(chainText || '').trim();
      const normalizedResult = String(resultText || '').trim();
      if (!normalizedChain || !normalizedResult) return;
      await executeChainedStagesFromResult(chat, normalizedChain, normalizedResult);
    }

    function handleIndexarArchivosRecursivoCommand(chat) {
      chat.draftText = '/indexar-archivos-recursivo ';
      renderChats();
      requestAnimationFrame(() => {
        const freshInput = document.querySelector('.chat-panel[data-chat-id="' + chat.id + '"] .chat-message-input');
        if (!freshInput || freshInput.disabled) return;
        freshInput.focus();
        freshInput.value = chat.draftText;
        freshInput.dispatchEvent(new Event('input', { bubbles: true }));
        try {
          freshInput.setSelectionRange(freshInput.value.length, freshInput.value.length);
        } catch (error) { }
      });
    }

    function handlePreviewCommand(chat) {
      chat.draftText = '/preview ';
      renderChats();
      requestAnimationFrame(() => {
        const freshInput = document.querySelector('.chat-panel[data-chat-id="' + chat.id + '"] .chat-message-input');
        if (!freshInput || freshInput.disabled) return;
        freshInput.focus();
        freshInput.value = chat.draftText;
        freshInput.dispatchEvent(new Event('input', { bubbles: true }));
        try {
          freshInput.setSelectionRange(freshInput.value.length, freshInput.value.length);
        } catch (error) { }
      });
    }

    async function runIndexarArchivosRecursivo(chat, filterText) {
      const selection = chat?.folderSelection || null;
      if (!selection) {
        setTemporaryChatStatus(chat, 'Primero selecciona una carpeta para indexar.', 4200);
        return '';
      }

      const targetPlan = getRecursiveIndexTargets(chat, filterText);
      if (targetPlan.mode === 'missing') {
        setTemporaryChatStatus(chat, 'Debe indicar un archivo para indexar.', 4200);
        return '';
      }
      if (!targetPlan.items.length) {
        setTemporaryChatStatus(chat, 'No encontré archivos que coincidan con ese patrón.', 4200);
        return '';
      }

      const sections = [];
      for (const item of targetPlan.items) {
        const graph = await buildRecursiveIndexGraph(chat, item.filterText);
        const summaryText = buildIndexTreeSummary(graph);
        const indexedCount = Array.isArray(graph?.files) ? graph.files.length : 0;
        sections.push({
          label: item.label,
          summaryText,
          indexedCount
        });
      }
      const totalIndexed = sections.reduce((sum, section) => sum + (Number(section?.indexedCount) || 0), 0);
      const finalText = 'Archivos indexados ' + totalIndexed + '\n\n' + sections.map(section => section.label + '\n```text\n' + section.summaryText + '\n```').join('\n\n');
      const replyMessage = {
        role: 'assistant',
        content: finalText,
        display: buildRecursiveIndexSectionsDisplay(sections),
        rawText: finalText,
        isIndexResult: true,
        isRecursiveIndexResult: true
      };
      chat.messages.push(replyMessage);
      saveChatToStorage(chat);
      renderChats();
      return finalText;
    }

    function handleRuleCommand(chat) {
      chat.draftText = '>> ';
      renderChats();
      requestAnimationFrame(() => {
        const freshInput = document.querySelector('.chat-panel[data-chat-id="' + chat.id + '"] .chat-message-input');
        if (!freshInput || freshInput.disabled) return;
        freshInput.focus();
        freshInput.value = chat.draftText;
        freshInput.dispatchEvent(new Event('input', { bubbles: true }));
        try {
          freshInput.setSelectionRange(freshInput.value.length, freshInput.value.length);
        } catch (error) { }
      });
    }

    function handleBranchCommandShortcut(chat, mode) {
      if (chat.hasBranches) {
        setTemporaryChatStatus(chat, 'Este chat ya contiene ramas asociadas.');
        return;
      }
      chat.draftText = mode === 'sequential' ? '/ramas-secuenciales' : '/ramas-paralelas';
      renderChats();
      requestAnimationFrame(() => {
        const freshInput = document.querySelector('.chat-panel[data-chat-id="' + chat.id + '"] .chat-message-input');
        if (!freshInput || freshInput.disabled) return;
        freshInput.focus();
        freshInput.value = chat.draftText;
        freshInput.dispatchEvent(new Event('input', { bubbles: true }));
        try {
          freshInput.setSelectionRange(freshInput.value.length, freshInput.value.length);
        } catch (error) { }
      });
    }

    function handleMultiIaCommandShortcut(chat) {
      if (chat.hasBranches) {
        setTemporaryChatStatus(chat, 'Este chat ya contiene ramas asociadas.');
        return;
      }
      chat.draftText = '/multi-ia ';
      renderChats();
      requestAnimationFrame(() => {
        const freshInput = document.querySelector('.chat-panel[data-chat-id="' + chat.id + '"] .chat-message-input');
        if (!freshInput || freshInput.disabled) return;
        freshInput.focus();
        freshInput.value = chat.draftText;
        freshInput.dispatchEvent(new Event('input', { bubbles: true }));
        try {
          freshInput.setSelectionRange(freshInput.value.length, freshInput.value.length);
        } catch (error) { }
      });
    }

    async function runWorkspaceThreeConsoleCommand(state, command) {
      if (command === 'contexto') {
        handleWorkspaceThreeContextoCommand(state);
      } else if (command === 'multi-ia') {
        handleWorkspaceThreeMultiIaCommandShortcut(state);
      } else if (command === 'resumen-anclados') {
        await handleWorkspaceThreeResumenCommand(state, 'anclados');
      } else if (command === 'resumen-general') {
        await handleWorkspaceThreeResumenCommand(state, 'general');
      } else if (command === 'chatsversion') {
        handleWorkspaceThreeVersionsCommand(state);
      } else if (command === 'eliminar') {
        handleWorkspaceThreeDeleteCommand(state);
      } else if (command === 'ramas-paralelas') {
        handleWorkspaceThreeBranchCommandShortcut(state, 'parallel');
      } else if (command === 'ramas-secuenciales') {
        handleWorkspaceThreeBranchCommandShortcut(state, 'sequential');
      }
    }

    function setWorkspaceThreeInputCommand(state, text) {
      if (!state?.input) return;
      state.input.value = text;
      state.input.focus();
      try {
        state.input.setSelectionRange(state.input.value.length, state.input.value.length);
      } catch (error) { }
    }

    function handleWorkspaceThreeContextoCommand(state) {
      const current = state.contextMessage ? (state.contextMessage.rawText || '') : '';
      setWorkspaceThreeInputCommand(state, '/contexto /resumen-general #');
    }

    function handleWorkspaceThreeMultiIaCommandShortcut(state) {
      setWorkspaceThreeInputCommand(state, '/multi-ia ');
    }

    function handleWorkspaceThreeBranchCommandShortcut(state, mode) {
      setWorkspaceThreeInputCommand(state, mode === 'sequential' ? '/ramas-secuenciales' : '/ramas-paralelas');
    }

    function openImportModal() {
      importTextarea.value = '';
      if (importFileInput) importFileInput.value = '';
      importStatus.textContent = '';
      importModalOverlay.hidden = false;
      importTextarea.focus();
    }

    function closeImportModal() {
      importModalOverlay.hidden = true;
    }

    async function loadImportedChat() {
      let parsed;
      try {
        let sourceText = importTextarea.value.trim();
        if (!sourceText && importFileInput && importFileInput.files && importFileInput.files[0]) {
          sourceText = await importFileInput.files[0].text();
        }
        parsed = JSON.parse(sourceText.trim());
      } catch (error) {
        importStatus.textContent = 'JSON inválido.';
        return;
      }
      if (!parsed || !Array.isArray(parsed.messages)) {
        importStatus.textContent = 'Configuración inválida: falta "messages".';
        return;
      }
      let name = (parsed.name && String(parsed.name).trim()) || '';
      if (!name || chatState.some(item => item.name === name)) {
        name = generateUniqueChatName();
      }
      const chat = {
        id: `chat-${Date.now()}-${chatState.length}`,
        name,
        minimized: false,
        docked: false,
        maximized: false,
        closing: false,
        deleted: false,
        focused: true,
        blinked: false,
        messages: parsed.messages,
        attachment: null,
        editingIndex: null,
        responseMode: parsed.responseMode === 'short' || parsed.responseMode === 'complex' ? parsed.responseMode : 'short',
        pinnedIndices: Array.isArray(parsed.pinnedIndices) ? parsed.pinnedIndices : [],
        expandedIndices: [],
        flashHighlight: true,
        replyingToIndex: null,
        favorite: false,
        isPrivate: false,
        unlocked: false,
        revealedOlderCount: 0,
        versions: Array.isArray(parsed.versions) ? parsed.versions : [],
        viewingVersionId: null,
        currentSourceLabel: typeof parsed.currentSourceLabel === 'string' ? parsed.currentSourceLabel : null,
        contextMessage: parsed.contextMessage || null,
        statusMessage: null,
        consoleShowVersions: false,
        consoleShowDelete: false,
        temporalMode: false,
        hasBranches: false,
        pinnedFileContext: parsed.pinnedFileContext || null
      };
      chatState.forEach(item => { item.focused = false; item.flashHighlight = false; });
      chatState.unshift(chat);
      saveChatToStorage(chat);
      saveChatOrder();
      closeImportModal();
      renderChats();
    }

    function initWorkspaceThree() {
      if (!workspaceThreeStage || !workspaceThreeCanvas) return;
      const panzoom = Panzoom(workspaceThreeCanvas, {
        canvas: true,
        minScale: 0.02,
        maxScale: 2.5,
        roundPixels: true,
        excludeClass: 'panzoom-exclude'
      });
      workspaceThreePanzoom = panzoom;

      if (typeof panzoom.zoom === 'function') {
        panzoom.zoom(0.4, { force: true });
      }

      workspaceThreeStage.addEventListener('wheel', panzoom.zoomWithWheel);
      workspaceThreeStage.addEventListener('dblclick', (event) => {
        if (event.target.closest('.workspace-three-chat') || event.target.closest('.panzoom-exclude')) return;
        event.preventDefault();
        if (typeof panzoom.zoomToPoint === 'function' && typeof panzoom.getScale === 'function') {
          const nextScale = Math.min(2.5, panzoom.getScale() * 1.25);
          panzoom.zoomToPoint(nextScale, { clientX: event.clientX, clientY: event.clientY }, { animate: true });
        } else if (typeof panzoom.zoomIn === 'function') {
          panzoom.zoomIn({ animate: true });
        }
      });
      panzoomZoomInBtn?.addEventListener('click', () => {
        if (typeof panzoom.zoomIn === 'function') panzoom.zoomIn({ animate: true });
      });
      panzoomZoomOutBtn?.addEventListener('click', () => {
        if (typeof panzoom.zoomOut === 'function') panzoom.zoomOut({ animate: true });
      });
      panzoomResetBtn?.addEventListener('click', () => {
        if (typeof panzoom.reset === 'function') {
          panzoom.reset({ animate: true, force: true });
        }
        if (typeof panzoom.zoom === 'function') {
          panzoom.zoom(0.4, { animate: true, force: true });
        }
      });
      workspaceThreeChatSend?.addEventListener('click', () => {
        const text = workspaceThreeChatInput?.value.trim();
        if (!text) return;
        const userBubble = document.createElement('div');
        userBubble.className = 'message user workspace-three-msg';
        userBubble.textContent = text;
        workspaceThreeChatBody?.appendChild(userBubble);
        const assistantBubble = document.createElement('div');
        assistantBubble.className = 'message assistant workspace-three-msg';
        assistantBubble.textContent = 'Workspace Three recibió: ' + text;
        workspaceThreeChatBody?.appendChild(assistantBubble);
        if (workspaceThreeChatInput) workspaceThreeChatInput.value = '';
      });
      workspaceThreeChatInput?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          workspaceThreeChatSend?.click();
        }
      });
    }

    function handlePowerShellCommand(chat) {
      chat.powershellPanelOpen = true;
      chat.draftText = '>>> ';
      renderChats();
      requestAnimationFrame(() => {
        const freshInput = document.querySelector('.chat-panel[data-chat-id="' + chat.id + '"] .chat-message-input');
        if (!freshInput || freshInput.disabled) return;
        freshInput.focus();
        freshInput.value = chat.draftText;
        freshInput.dispatchEvent(new Event('input', { bubbles: true }));
        try {
          freshInput.setSelectionRange(freshInput.value.length, freshInput.value.length);
        } catch (error) { }
      });
    }

    if (workspaceThreeChatInputTwo && workspaceThreeChatSendTwo && workspaceThreeChatBodyTwo) {
      workspaceThreeChatSendTwo.addEventListener('click', () => {
        const text = workspaceThreeChatInputTwo.value.trim();
        if (!text) return;
        const userBubble = document.createElement('div');
        userBubble.className = 'message user workspace-three-msg';
        userBubble.textContent = text;
        workspaceThreeChatBodyTwo.appendChild(userBubble);
        const assistantBubble = document.createElement('div');
        assistantBubble.className = 'message assistant workspace-three-msg';
        assistantBubble.textContent = 'Chat Two recibió: ' + text;
        workspaceThreeChatBodyTwo.appendChild(assistantBubble);
        workspaceThreeChatInputTwo.value = '';
      });
      workspaceThreeChatInputTwo.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          workspaceThreeChatSendTwo.click();
        }
      });
    }

    function initWorkspaceThreeConnections() {
      if (!window.jsPlumb || !workspaceThreeCanvas) return;
      const instance = window.jsPlumb.getInstance({
        Connector: ['Flowchart', { cornerRadius: 12, stub: 24 }],
        PaintStyle: { stroke: 'rgba(65, 214, 199, 0.9)', strokeWidth: 3 },
        Endpoint: 'Blank',
        HoverPaintStyle: { stroke: 'rgba(255, 216, 77, 0.95)', strokeWidth: 3 },
        ConnectionOverlays: [
          ['Arrow', { location: 1, width: 10, length: 10, foldback: 0.8, paintStyle: { fill: 'rgba(65, 214, 199, 0.95)' } }]
        ]
      });
      workspaceThreeJsPlumb = instance;

      instance.setContainer(workspaceThreeCanvas);
      if (workspaceThreeChat?.isConnected && workspaceThreeChatTwo?.isConnected) {
        workspaceThreeConnection = instance.connect({
          source: workspaceThreeChat,
          target: workspaceThreeChatTwo,
          anchors: [['RightMiddle'], ['LeftMiddle']]
        });
        workspaceThreeConnections.push(workspaceThreeConnection);
        const sourceState = workspaceThreeMiniChats.find(item => item.element === workspaceThreeChat);
        const targetState = workspaceThreeMiniChats.find(item => item.element === workspaceThreeChatTwo);
        if (sourceState) sourceState.connections.push(workspaceThreeConnection);
        if (targetState) targetState.connections.push(workspaceThreeConnection);
      }

      const repaint = () => refreshWorkspaceThreeConnection();
      requestAnimationFrame(repaint);
      window.addEventListener('resize', repaint);
    }

    function getWorkspaceThreeScale() {
      if (!workspaceThreeCanvas) return 1;
      const transform = getComputedStyle(workspaceThreeCanvas).transform;
      if (!transform || transform === 'none') return 1;
      const matrix = new DOMMatrixReadOnly(transform);
      return matrix.a || 1;
    }

    function wireWorkspaceThreeChatDrag(chatEl) {
      if (!chatEl || !workspaceThreeCanvas || !workspaceThreeStage) return;
      const handle = chatEl.querySelector('.workspace-three-chat-drag-handle');
      if (!handle) return;

      if (!chatEl.dataset.x) chatEl.dataset.x = String(chatEl.offsetLeft || 0);
      if (!chatEl.dataset.y) chatEl.dataset.y = String(chatEl.offsetTop || 0);
      setWorkspaceThreeChatPosition(chatEl, parseFloat(chatEl.dataset.x || '0'), parseFloat(chatEl.dataset.y || '0'));

      let dragging = false;
      let startX = 0;
      let startY = 0;
      let startLeft = 0;
      let startTop = 0;

      handle.addEventListener('pointerdown', (event) => {
        if (event.target.closest('.panzoom-exclude')) return;
        event.preventDefault();
        event.stopPropagation();
        dragging = true;
        startX = event.clientX;
        startY = event.clientY;
        startLeft = parseFloat(chatEl.dataset.x || '0');
        startTop = parseFloat(chatEl.dataset.y || '0');
        handle.setPointerCapture(event.pointerId);
      });

      handle.addEventListener('pointermove', (event) => {
        if (!dragging) return;
        const scale = getWorkspaceThreeScale();
        const dx = (event.clientX - startX) / scale;
        const dy = (event.clientY - startY) / scale;
        const nextX = startLeft + dx;
        const nextY = startTop + dy;
        setWorkspaceThreeChatPosition(chatEl, nextX, nextY);
        refreshWorkspaceThreeConnection();
      });

      const stopDrag = (event) => {
        if (!dragging) return;
        dragging = false;
        try { handle.releasePointerCapture(event.pointerId); } catch (error) { }
        refreshWorkspaceThreeConnection();
        saveWorkspaceThreeToStorage();
      };
      handle.addEventListener('pointerup', stopDrag);
      handle.addEventListener('pointercancel', stopDrag);
    }

    if (workspaceThreeChat?.isConnected) wireWorkspaceThreeChatDrag(workspaceThreeChat);
    if (workspaceThreeChatTwo?.isConnected) wireWorkspaceThreeChatDrag(workspaceThreeChatTwo);

    function renderMinimizedMenu() {
      const minimized = chatState.filter(chat => chat.minimized && !chat.deleted);
      minimizedCount.textContent = minimized.length;
      minimizedMenu.innerHTML = '';
      sidebarDropZone.innerHTML = '';
      sidebarDropZone.innerHTML = '<div class="empty-state">Arrastra un chat ac&aacute;</div>';

    }

    function escapeHtml(value) {
      return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function clearHighlightsInElement(element) {
      element.querySelectorAll('mark.search-highlight').forEach(mark => {
        const parent = mark.parentNode;
        if (!parent) return;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
      });
    }

    function highlightMatchesInElement(element, query) {
      if (!query) return 0;
      const lowerQuery = query.toLowerCase();
      let count = 0;
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
      const textNodes = [];
      let node;
      while ((node = walker.nextNode())) {
        textNodes.push(node);
      }
      textNodes.forEach(textNode => {
        const text = textNode.textContent;
        const lowerText = text.toLowerCase();
        let idx = lowerText.indexOf(lowerQuery);
        if (idx === -1) return;
        const frag = document.createDocumentFragment();
        let lastEnd = 0;
        while (idx !== -1) {
          frag.appendChild(document.createTextNode(text.slice(lastEnd, idx)));
          const mark = document.createElement('mark');
          mark.className = 'search-highlight';
          mark.textContent = text.slice(idx, idx + query.length);
          frag.appendChild(mark);
          count++;
          lastEnd = idx + query.length;
          idx = lowerText.indexOf(lowerQuery, lastEnd);
        }
        frag.appendChild(document.createTextNode(text.slice(lastEnd)));
        textNode.parentNode.replaceChild(frag, textNode);
      });
      return count;
    }

    function startEditChatTitle(id, panel) {
      const chat = chatState.find(item => item.id === id);
      if (!chat) return;
      const titleWrap = panel.querySelector('.panel-title');
      const titleText = panel.querySelector('.chat-title-text');
      if (!titleWrap || !titleText || titleWrap.querySelector('.chat-title-input')) return;

      const input = document.createElement('input');
      input.className = 'chat-title-input';
      input.type = 'text';
      input.value = chat.name;
      input.maxLength = 40;

      let committed = false;
      const commit = () => {
        if (committed) return;
        committed = true;
        const next = input.value.trim();
        if (next && next !== chat.name) {
          const previousName = chat.name;
          removeChatFromStorage(previousName);
          chat.name = next;
          updateWorkspaceThreeOwnerName(previousName, next);
          saveChatToStorage(chat);
        }
        renderChats();
      };

      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') commit();
        if (event.key === 'Escape') {
          committed = true;
          renderChats();
        }
      });
      input.addEventListener('blur', commit);

      titleText.replaceWith(input);
      input.focus();
      input.select();
    }

    function renderChats() {
      const maximizedChat = chatState.find(chat => chat.maximized && !chat.deleted);
      const focusedChat = chatState.find(chat => chat.focused && !chat.deleted);
      chatGrid.classList.remove('cols-1', 'cols-2', 'cols-3');
      chatGrid.classList.add('cols-' + chatGridColumns);
      chatGrid.classList.toggle('maximized', Boolean(maximizedChat));
      mainShell.style.minHeight = focusedChat ? 'calc(100vh - var(--topbar-height) - var(--bottom-height) - 20px)' : '100%';

      const visibleChatCount = chatState.filter(chat => !chat.minimized && !chat.deleted).length;
      const columnCount = getComputedStyle(chatGrid).gridTemplateColumns.split(' ').filter(Boolean).length || 1;
      const isSingleRow = !maximizedChat && visibleChatCount > 0 && visibleChatCount <= columnCount;
      chatGrid.classList.toggle('single-row', isSingleRow);

      chatGrid.innerHTML = '';
      sidebarDockedChats.innerHTML = '';
      chatState.forEach(chat => {
        if ((chat.minimized || chat.deleted) && !chat.docked) return;
        const justGainedFocus = chat.focused && !chat._wasFocused;
        chat._wasFocused = chat.focused;

        const panel = document.createElement('article');
        panel.className = 'chat-panel';
        panel.setAttribute('data-chat-id', chat.id);
        if (chat.maximized) panel.classList.add('maximized');
        if (chat.docked) panel.classList.add('docked');
        if (chat.focused) panel.classList.add('focused');
        if (chat.blinked) panel.classList.add('blinked');
        if (chat.closing) panel.classList.add('closing');
        if (chat.flashHighlight) panel.classList.add('flash-highlight');
        if (chat.powershellPanelOpen) panel.classList.add('powershell-open');
        const folderSelection = chat.folderSelection && typeof chat.folderSelection === 'object' ? chat.folderSelection : null;
        const folderPanelOpen = Boolean(folderSelection && chat.folderPanelOpen);
        const folderNameValue = folderSelection?.name || '';
        panel.classList.toggle('folder-open', folderPanelOpen);

        const chatVersions = Array.isArray(chat.versions) ? chat.versions : [];
        const viewingVersion = chat.viewingVersionId ? chatVersions.find(v => v.id === chat.viewingVersionId) : null;
        const isVersionPicker = Boolean(chat.consoleShowVersions);
        const isDeletePicker = Boolean(chat.consoleShowDelete);
        const isPickerMode = isVersionPicker || isDeletePicker;
        const isReadOnly = Boolean(viewingVersion);
        const activeMessages = viewingVersion ? viewingVersion.messages : chat.messages;
        const activePinnedIndices = viewingVersion ? (viewingVersion.pinnedIndices || []) : chat.pinnedIndices;

        const lastMsgIndex = activeMessages.length - 1;
        const assistantIdxList = activeMessages
          .map((message, i) => ({ message, i }))
          .filter(item => item.message.role === 'assistant' && !item.message.typing)
          .map(item => item.i);

        let historyStartIndex = 0;
        if (assistantIdxList.length > 10) {
          const visibleAssistantCount = Math.min(assistantIdxList.length, 10 + (chat.revealedOlderCount || 0) * 10);
          const cutoffPos = assistantIdxList.length - visibleAssistantCount;
          if (cutoffPos > 0) {
            historyStartIndex = assistantIdxList[cutoffPos - 1] + 1;
          }
        }
        const showMoreHtml = historyStartIndex > 0
          ? '<button type="button" class="show-more-messages">Mostrar 10 mensajes más...</button>'
          : '';

        const history = activeMessages.length
          ? showMoreHtml + activeMessages.slice(historyStartIndex).map((message, sliceIdx) => {
            const i = historyStartIndex + sliceIdx;
            if (message.typing) {
              return '<div class="message assistant typing" data-msg-index="' + i + '"><span class="typing-dots"><span></span><span></span><span></span></span></div>';
            }
            const isExpired = isTemporalMessageExpired(message);
            if (message.isSummary) {
              const plainSummary = (message.rawText || message.content || '').trim();
              const isExpanded = chat.expandedIndices.includes(i);
              const isTruncatable = plainSummary.length > 200;
              const contentHtml = (isTruncatable && !isExpanded)
                ? escapeHtml(plainSummary.slice(0, 200)) + '..........'
                : (message.display || message.content);
              const body = '<div class="message-content' + (isTruncatable ? ' truncatable' : '') + '" data-msg-index="' + i + '">' + contentHtml + '</div>';
              const summaryReplicateBtn = '<button type="button" class="msg-replicate" data-msg-index="' + i + '" title="Reutilizar en caja de mensaje">&#128229;</button>';
              const summaryDeleteBtn = isReadOnly ? '' : '<button type="button" class="msg-delete" data-msg-index="' + i + '" title="Eliminar">&#128465;</button>';
              const summaryActions = '<div class="message-actions">' + summaryReplicateBtn + summaryDeleteBtn + '</div>';
              return '<div class="message summary-message' + (isExpired ? ' expired' : '') + '" data-msg-index="' + i + '">' + body + summaryActions + '</div>';
            }
            const cls = message.isRule
              ? 'rule-message'
              : (message.isLocalPreviewResult
                ? 'local-preview-message'
                : ((message.isPowerShell || message.isPowerShellResult) ? 'powershell-message' : (message.role === 'user' ? 'user' : 'assistant')));
            const isPinned = activePinnedIndices.includes(i);
            const plain = (message.rawText || message.content || '').trim();
            const isLast = i === lastMsgIndex;
            const isTruncatable = !isLast && plain.length > 100;
            const isExpanded = chat.expandedIndices.includes(i);
            const contentHtml = (isTruncatable && !isExpanded)
              ? escapeHtml(plain.slice(0, 100)) + '...'
              : (message.display || message.content);
            const body = '<div class="message-content' + (isTruncatable ? ' truncatable' : '') + '" data-msg-index="' + i + '">' + contentHtml + '</div>';
            const pinBtn = '<button type="button" class="msg-pin' + (isPinned ? ' active' : '') + '" data-msg-index="' + i + '" title="' + (isPinned ? 'Desanclar' : 'Anclar') + '">&#128204;</button>';
            const replicateBtn = '<button type="button" class="msg-replicate" data-msg-index="' + i + '" title="Reutilizar en caja de mensaje">&#128229;</button>';
            let actions;
            if (isReadOnly) {
              actions = '<div class="message-actions">' + pinBtn + replicateBtn + '</div>';
            } else {
              const replyBtn = '<button type="button" class="msg-reply" data-msg-index="' + i + '" title="Responder">&#8617;</button>';
              const deleteBtn = '<button type="button" class="msg-delete" data-msg-index="' + i + '" title="Eliminar">&#128465;</button>';
              actions = cls === 'user'
                ? '<div class="message-actions"><button type="button" class="msg-edit" data-msg-index="' + i + '" title="Editar">&#9998;</button><button type="button" class="msg-copy" data-msg-index="' + i + '" title="Copiar">&#128203;</button>' + pinBtn + replicateBtn + replyBtn + deleteBtn + '</div>'
                : '<div class="message-actions"><button type="button" class="msg-copy" data-msg-index="' + i + '" title="Copiar">&#128203;</button>' + pinBtn + replicateBtn + replyBtn + deleteBtn + '</div>';
            }
            return '<div class=\"message ' + cls + (isPinned ? ' pinned' : '') + (isExpired || message.isLocalPreviewResult ? ' expired' : '') + '\" data-msg-index=\"' + i + '\">' + body + actions + '</div>';
          }).join('')
          : '';

        const temporalNoticeHtml = (chat.temporalMode && !isReadOnly && !isPickerMode)
          ? '<div class="message temporal-notice">&#128337; Los mensajes de este chat son temporales, considere aquí solo mensajes que no necesiten contexto ni memoria</div>'
          : '';

        let contextMessageHtml = '';
        if (chat.contextMessage && !isPickerMode) {
          const contextPlain = (chat.contextMessage.rawText || chat.contextMessage.content || '').trim();
          const contextPreview = contextPlain.length > 100 ? contextPlain.slice(0, 100) + '...' : contextPlain;
          const contextPreviewHtml = escapeHtml(contextPreview);
          const contextFullHtml = chat.contextMessage.display || escapeHtml(contextPlain);
          contextMessageHtml = '<div class="message context-message" data-context-message="1">'
            + '<div class="message-content"><span class="context-preview">' + contextPreviewHtml + '</span><span class="context-full">' + contextFullHtml + '</span></div>'
            + '<div class="message-actions">'
            + '<button type="button" class="context-edit-btn" title="Editar mensaje de contexto">&#9998;</button>'
            + '<button type="button" class="msg-replicate-context" title="Reutilizar en caja de mensaje">&#128229;</button>'
            + '<button type="button" class="context-remove-btn" title="Quitar mensaje de contexto">&#128465;</button>'
            + '</div></div>';
        }

        const attachmentNote = (chat.attachment && !isReadOnly)
          ? '<div class="message attachment-note"><a class="attachment-link" href="' + chat.attachment.url + '" download="' + escapeHtml(chat.attachment.name) + '" target="_blank" rel="noopener">&#128206; ' + escapeHtml(chat.attachment.name) + ' (clic para descargar)</a><button type="button" class="attachment-remove-btn" title="Quitar adjunto">&#215;</button></div>'
          : '';

        const sentMessages = activeMessages
          .map((message, i) => ({ message, index: i }))
          .filter(item => item.message.role === 'user' && !item.message.typing);
        const historyItems = sentMessages.length
          ? sentMessages.map(item => {
            const raw = (item.message.rawText || item.message.content || '').trim();
            const truncated = raw.length > 30 ? raw.slice(0, 30) + '...' : raw;
            return '<button type="button" class="history-item" data-msg-index="' + item.index + '">' + escapeHtml(truncated) + '</button>';
          }).join('')
          : '<div class="empty-state">Sin mensajes enviados</div>';

        const modeLabel = chat.responseMode === 'complex' ? 'Compleja' : chat.responseMode === 'short' ? 'Corta' : 'Normal';
        const modeOptions = [
          { key: '', label: 'Normal' },
          { key: 'short', label: 'Respuesta corta' },
          { key: 'complex', label: 'Respuesta compleja' }
        ];
        const modeMenuItems = modeOptions.map(opt => {
          const isActive = (chat.responseMode || '') === opt.key;
          return '<button type="button" class="mode-item' + (isActive ? ' active' : '') + '" data-mode="' + opt.key + '">' + opt.label + '</button>';
        }).join('');

        const pinnedItems = activePinnedIndices
          .filter(idx => activeMessages[idx] && !activeMessages[idx].typing)
          .map(idx => {
            const pm = activeMessages[idx];
            const raw = (pm.rawText || pm.content || '').trim();
            const truncated = raw.length > 30 ? raw.slice(0, 30) + '...' : raw;
            return '<button type="button" class="history-item" data-msg-index="' + idx + '">' + escapeHtml(truncated) + '</button>';
          }).join('');
        const pinsMenuHtml = pinnedItems || '<div class="empty-state">Sin mensajes anclados</div>';

        let replyBannerHtml = '';
        if (chat.replyingToIndex != null && chat.messages[chat.replyingToIndex]) {
          const replyMsg = chat.messages[chat.replyingToIndex];
          const raw = (replyMsg.rawText || replyMsg.content || '').trim();
          const trunc = raw.length > 20 ? raw.slice(0, 20) + '...' : raw;
          replyBannerHtml = '<div class="reply-banner"><span>&#8617; Respondiendo: ' + escapeHtml(trunc) + '</span><button type="button" class="cancel-reply" title="Cancelar respuesta">&#215;</button></div>';
        }

        const consoleMenuHtml = ''
          + '<button type="button" class="console-item" data-command="contexto">/contexto<span class="console-item-desc">Fija un mensaje de contexto siempre visible al inicio del chat</span></button>'
          + '<button type="button" class="console-item" data-command="mensajes">/mensajes<span class="console-item-desc">Lista accesos rápidos a mensajes del chat y permite encadenarlos</span></button>'
          + '<button type="button" class="console-item" data-command="rule">>> regla<span class="console-item-desc">Inicia una regla de interpretación y enrutamiento</span></button>'
          + '<button type="button" class="console-item" data-command="powershell">>>> powershell<span class="console-item-desc">Ejecuta comandos PowerShell localmente</span></button>'
          + '<button type="button" class="console-item" data-command="anclar-archivo">/anclar-archivo<span class="console-item-desc">Escribe el comando y luego menciona un archivo para anclarlo</span></button>'
          + '<button type="button" class="console-item" data-command="branch">/branch<span class="console-item-desc">Crea un chat Branch derivado del actual</span></button>'
          + '<button type="button" class="console-item" data-command="preview">/preview<span class="console-item-desc">Carga un archivo mencionado en el panel de vista previa</span></button>'
          + '<button type="button" class="console-item" data-command="limpiar">/limpiar<span class="console-item-desc">Elimina todos los mensajes de la versión actual sin borrar el contexto</span></button>'
          + '<button type="button" class="console-item" data-command="lienzo">/lienzo<span class="console-item-desc">Abre Workspace Three y coloca el chat actual en el lienzo</span></button>'
          + '<button type="button" class="console-item" data-command="ramas-paralelas">/ramas-paralelas<span class="console-item-desc">Escribe el comando en la caja para crear ramas asociadas en paralelo</span></button>'
          + '<button type="button" class="console-item" data-command="ramas-secuenciales">/ramas-secuenciales<span class="console-item-desc">Escribe el comando en la caja para crear ramas asociadas en secuencia</span></button>'
          + '<button type="button" class="console-item" data-command="multi-ia">/multi-ia<span class="console-item-desc">Escribe el comando en la caja para consultar varios motores con el mismo mensaje</span></button>'
          + '<button type="button" class="console-item" data-command="resumen-anclados">/resumen-anclados<span class="console-item-desc">Resume solo los mensajes anclados (funciona también viendo una versión anterior)</span></button>'
          + '<button type="button" class="console-item" data-command="resumen-general">/resumen-general<span class="console-item-desc">Resume toda la conversación completa</span></button>'
          + '<button type="button" class="console-item" data-command="chatsversion">/chatsversion<span class="console-item-desc">Lista y carga versiones anteriores del chat</span></button>'
          + '<button type="button" class="console-item" data-command="eliminar">/eliminar<span class="console-item-desc">Lista las versiones para eliminarlas permanentemente</span></button>';
          

        let versionListHtml = '';
        if (isVersionPicker) {
          const versionRows = chatVersions.length
            ? chatVersions.slice().reverse().map(v => '<button type="button" class="version-list-item' + (chat.viewingVersionId === v.id ? ' active' : '') + '" data-version-id="' + v.id + '">' + formatVersionLineage(v.label, v.sourceLabel) + '</button>').join('')
            : '<div class="empty-state">Sin versiones guardadas</div>';
          versionListHtml = '<div class="version-list">'
            + '<div class="version-list-header"><span>&#128337; Versiones del chat</span><button type="button" class="version-list-close" title="Cerrar">&#215;</button></div>'
            + '<button type="button" class="version-list-item' + (chat.viewingVersionId ? '' : ' active') + '" data-version-id="">' + formatVersionLineage('Versión actual', chat.currentSourceLabel) + '</button>'
            + versionRows
            + '</div>';
        }

        let deleteListHtml = '';
        if (isDeletePicker) {
          const versionRows = chatVersions.length
            ? chatVersions.slice().reverse().map(v => '<div class="version-list-row"><span class="version-list-label">' + formatVersionLineage(v.label, v.sourceLabel) + '</span><button type="button" class="version-delete-btn" data-version-id="' + v.id + '" title="Eliminar permanentemente">&#128465;</button></div>').join('')
            : '<div class="empty-state">Sin versiones guardadas</div>';
          deleteListHtml = '<div class="version-list">'
            + '<div class="version-list-header"><span>&#128465; Eliminar versiones</span><button type="button" class="version-list-close" title="Cerrar">&#215;</button></div>'
            + '<div class="version-list-row"><span class="version-list-label">' + formatVersionLineage('Versión actual', chat.currentSourceLabel) + '</span><button type="button" class="version-delete-btn" data-version-id="" title="Eliminar permanentemente">&#128465;</button></div>'
            + versionRows
            + '</div>';
        }

        let versionBannerHtml = '';
        if (viewingVersion && !isPickerMode) {
          versionBannerHtml = '<div class="version-banner"><span>&#128337; Viendo ' + escapeHtml(viewingVersion.label) + ' (solo lectura, puedes anclar mensajes para /resumen)</span><button type="button" class="back-to-current-version">Volver a versión actual</button></div>';
        }
        const hasBranches = Boolean(chat.hasBranches);
        const hierarchyActive = hasBranches && workspaceThreeVisible && activeWorkspaceThreeChatId === chat.id;
        const branchesBannerHtml = hasBranches
          ? '<div class="status-banner branches-banner">Este chat contiene ramas asociadas.</div>'
          : '';
        const hierarchyButtonHtml = hasBranches
          ? '<div class="chat-title-tools"><button type="button" class="hierarchy-toggle' + (hierarchyActive ? ' active' : '') + '" title="' + (hierarchyActive ? 'Ocultar ramas asociadas' : 'Mostrar ramas asociadas') + '"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2"></circle><circle cx="18" cy="6" r="2"></circle><circle cx="12" cy="18" r="2"></circle><path d="M8 6h8"></path><path d="M7.4 7.2l3.3 8.2"></path><path d="M16.6 7.2l-3.3 8.2"></path></svg></button></div>'
          : '';
        const statusBannerHtml = chat.statusMessage
          ? '<div class="status-banner">' + escapeHtml(chat.statusMessage) + '</div>'
          : '';
        const pinnedFileBannerHtml = chat.pinnedFileContext
          ? '<div class="status-banner pinned-file-banner"><div class="pinned-file-banner-content"><strong>&#128206; Archivo anclado:</strong><span>' + escapeHtml(chat.pinnedFileContext.path || chat.pinnedFileContext.name || 'archivo') + '</span></div><button type="button" class="pinned-file-close-btn" title="Cerrar">&#215;</button></div>'
          : '';

        panel.innerHTML = `
          <div class="panel-top">
            <div class="panel-title-row">
              <div class="panel-title">
                <div class="panel-dot"></div>
                <strong class="chat-title-text">${chat.name}</strong>
              </div>
              ${hierarchyButtonHtml}
              <div class="panel-main-actions">
                <button type="button" class="min-btn" title="Minimizar">&#8722;</button>
                <button type="button" class="max-btn" title="Maximizar">&#9633;</button>
                <button type="button" class="close-btn" title="Cerrar">&#215;</button>
              </div>
            </div>
            <div class="panel-actions">
              <div class="panel-folder">
                <button type="button" class="folder-toggle" title="Seleccionar carpeta">&#128194;</button>
                <input type="text" class="folder-name-input" value="${escapeHtml(folderNameValue)}" placeholder="Carpeta..." readonly />
                <button type="button" class="folder-view-toggle" title="Ir a mensajes">&#128172;</button>
              </div>
              <button type="button" class="fav-toggle${chat.favorite ? ' active' : ''}" title="${chat.favorite ? 'Quitar de favoritos' : 'Marcar como favorito'}">&#9733;</button>
              <button type="button" class="key-toggle${chat.isPrivate ? ' active' : ''}" title="${chat.isPrivate ? 'Chat privado' : 'Proteger chat con contraseña'}">&#128274;</button>
              <button type="button" class="temporal-toggle${chat.temporalMode ? ' active' : ''}" title="${chat.temporalMode ? 'Desactivar modo temporal' : 'Activar modo temporal (mensajes que se autoeliminan en 1 minuto)'}">&#9202;</button>
              <div class="mode-select">
                <button type="button" class="mode-toggle" title="Opciones (${modeLabel})">&#9881;</button>
                <div class="mode-menu">${modeMenuItems}</div>
              </div>
              <div class="panel-pins">
                <button type="button" class="pins-toggle" title="Mensajes anclados">&#128204;</button>
                <div class="pins-menu">${pinsMenuHtml}</div>
              </div>
              <div class="panel-history">
                <button type="button" class="history-toggle" title="Historial de mensajes enviados">&#9776;</button>
                <div class="history-menu">${historyItems}</div>
              </div>
              <div class="panel-search">
                <button type="button" class="search-toggle" title="Buscar">&#128269;</button>
                <div class="search-bar">
                  <input type="text" class="search-input" placeholder="Buscar en el chat..." />
                  <button type="button" class="search-prev" title="Anterior">&#8593;</button>
                  <button type="button" class="search-next" title="Siguiente">&#8595;</button>
                </div>
              </div>
              <div class="panel-share">
                <button type="button" class="share-toggle" title="Compartir"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"></path><path d="M7 8l5-5 5 5"></path><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"></path></svg></button>
                <div class="share-menu">
                  <button type="button" class="share-item" data-share="pinned">Compartir mensajes anclados${viewingVersion ? ' (' + escapeHtml(viewingVersion.label) + ')' : ''}</button>
                  <button type="button" class="share-item" data-share="all">Compartir todo el chat${viewingVersion ? ' (' + escapeHtml(viewingVersion.label) + ')' : ''}</button>
                </div>
              </div>
              <div class="panel-console">
                <button type="button" class="console-toggle" title="Consola de comandos"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg></button>
                <div class="console-menu">${consoleMenuHtml}</div>
              </div>
            </div>
          </div>
          <div class="panel-body panel-messages-body">${isDeletePicker ? deleteListHtml : (isVersionPicker ? versionListHtml : (branchesBannerHtml + contextMessageHtml + statusBannerHtml + temporalNoticeHtml + history + attachmentNote))}</div>
          <div class="panel-body panel-folder-body" hidden></div>
          <div class="panel-body panel-folder-preview-body" hidden></div>
          <div class="panel-body panel-powershell-body" hidden>
            <div class="powershell-terminal"></div>
          </div>
          <button type="button" class="scroll-to-bottom-btn" hidden title="Ir al final">&#8595; Ir abajo</button>
          ${branchesBannerHtml}
          ${statusBannerHtml}
          ${pinnedFileBannerHtml}
          ${versionBannerHtml}
          ${(chat.viewingVersionId || isPickerMode) ? '' : replyBannerHtml}
          <div class="panel-input${hasBranches ? ' branch-locked' : ''}"${(chat.viewingVersionId || isPickerMode) ? ' hidden' : ''}>
            <div class="panel-attach">
              <button type="button" class="attach-toggle" title="Adjuntar"${hasBranches ? ' disabled' : ''}>+</button>
              <div class="panel-attach-menu">
                <button type="button" class="attach-file-btn">Adjuntar archivo</button>
              </div>
            </div>
            <div class="chat-compose-wrap">
              <textarea class="chat-message-input" rows="2" placeholder="${hasBranches ? 'Chat bloqueado por ramas asociadas.' : (chat.editingIndex != null ? 'Editando mensaje...' : 'Escribe un mensaje...')}"${hasBranches ? ' disabled' : ''}></textarea>
              <div class="mention-menu" hidden></div>
            </div>
            <button type="button" class="send-btn"${hasBranches ? ' disabled' : ''}>Enviar</button>
          </div>
          ${(chat.isPrivate && !chat.unlocked) ? '<div class="privacy-overlay"><div class="privacy-overlay-box"><div>&#128274; Chat privado</div><div class="privacy-overlay-form"><input type="password" class="privacy-password-input" placeholder="Contraseña" autocomplete="off" /><button type="button" class="privacy-unlock-btn" title="Desbloquear">&#128274;</button></div><div class="privacy-overlay-error"></div></div></div>' : ''}
        `;

        const folderButton = panel.querySelector('.folder-toggle');
        const folderNameInput = panel.querySelector('.folder-name-input');
        const folderViewButton = panel.querySelector('.folder-view-toggle');
        const messagesBody = panel.querySelector('.panel-messages-body');
        const folderBody = panel.querySelector('.panel-folder-body');
        const folderPreviewBody = panel.querySelector('.panel-folder-preview-body');
        if (folderButton) folderButton.classList.toggle('active', folderPanelOpen);
        if (folderNameInput) folderNameInput.value = folderNameValue;
        if (folderViewButton) folderViewButton.hidden = false;
        if (messagesBody) messagesBody.hidden = folderPanelOpen;
        if (folderBody) {
          folderBody.hidden = !folderPanelOpen || Boolean(chat.folderPreviewPath);
          const folderTreeHtml = folderSelection
            ? (window.nanochatFolderBrowser && typeof window.nanochatFolderBrowser.renderDirectoryTreeHtml === 'function'
              ? window.nanochatFolderBrowser.renderDirectoryTreeHtml(folderSelection.tree)
              : '<div class="folder-tree-empty">No se pudo cargar el visor de carpetas.</div>')
            : '<div class="folder-tree-empty">Selecciona una carpeta para ver su contenido.</div>';
          folderBody.innerHTML = folderTreeHtml;
        }
        if (folderPreviewBody) {
          folderPreviewBody.hidden = !(folderPanelOpen && Boolean(chat.folderPreviewPath));
          folderPreviewBody.innerHTML = folderPanelOpen && chat.folderPreviewPath
            ? renderFolderPreviewPanelHtml(chat)
            : '';
        }

        if (folderBody) {
          folderBody.addEventListener('click', (event) => {
            const folderToggle = event.target.closest('.folder-tree-folder');
            if (folderToggle) {
              event.preventDefault();
              event.stopPropagation();
              const branch = folderToggle.closest('.folder-tree-branch');
              const folderPath = branch && branch.getAttribute('data-folder-path');
              const folderSelection = chat.folderSelection && chat.folderSelection.tree;
              const folderNode = folderSelection && folderPath
                ? findFolderTreeFolderNode(folderSelection, folderPath)
                : null;
              if (!folderNode) return;
              folderNode.expanded = !folderNode.expanded;
              saveChatToStorage(chat);
              renderChats();
              return;
            }
            const folderFileLink = event.target.closest('.folder-tree-file-link');
            if (!folderFileLink) return;
            event.preventDefault();
            event.stopPropagation();
            const filePath = folderFileLink.getAttribute('data-file-path');
            if (!chat.folderSelection || !filePath) return;
            Promise.resolve(openFileInPreviewPanel(chat, filePath)).catch(() => {
              chat.folderPreviewLoading = false;
              chat.folderPreviewError = 'No se pudo cargar la vista previa del archivo.';
              chat.statusMessage = 'No se pudo cargar la vista previa del archivo.';
              saveChatToStorage(chat);
              renderChats();
            });
          });
        }
        if (folderPreviewBody) {
          folderPreviewBody.addEventListener('click', (event) => {
            const folderPreviewCloseBtn = event.target.closest('.folder-preview-close-btn');
            if (folderPreviewCloseBtn) {
              event.preventDefault();
              event.stopPropagation();
              chat.folderPreviewPath = null;
              chat.folderPreviewLoading = false;
              chat.folderPreviewError = null;
              saveChatToStorage(chat);
              renderChats();
              return;
            }
          });
        }

        const titleEl = panel.querySelector('.chat-title-text');
        titleEl.addEventListener('click', (event) => {
          event.stopPropagation();
          startEditChatTitle(chat.id, panel);
        });
        if (folderButton) {
          folderButton.addEventListener('click', (event) => {
            event.stopPropagation();
            handleChatFolderAction(chat.id);
          });
        }
        if (folderNameInput) {
          folderNameInput.addEventListener('click', (event) => {
            event.stopPropagation();
            if (!chat.folderSelection) return;
            chat.folderPanelOpen = true;
            if (messagesBody) messagesBody.hidden = true;
          if (folderBody) folderBody.hidden = false;
            saveChatToStorage(chat);
            renderChats();
          });
        }
        if (folderViewButton) {
          folderViewButton.addEventListener('click', (event) => {
            event.stopPropagation();
            chat.folderPanelOpen = false;
            chat.powershellPanelOpen = false;
            chat.draftText = '';
            saveChatToStorage(chat);
            renderChats();
          });
        }
        const pinnedFileCloseBtn = panel.querySelector('.pinned-file-close-btn');
        if (pinnedFileCloseBtn) {
          pinnedFileCloseBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            chat.pinnedFileContext = null;
            saveChatToStorage(chat);
            renderChats();
          });
        }
        const hierarchyToggle = panel.querySelector('.hierarchy-toggle');
        if (hierarchyToggle) {
          hierarchyToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleWorkspaceThreeForChat(chat.id);
          });
        }
        const panelTop = panel.querySelector('.panel-top');

        panel.addEventListener('click', (event) => {
          if (chat.focused) return;
          const clickedInput = event.target.closest('.chat-message-input, .privacy-password-input, .search-input');
          focusChat(chat.id);
          if (clickedInput) {
            const inputSelector = ['chat-message-input', 'privacy-password-input', 'search-input']
              .map(cls => '.' + cls)
              .find(sel => clickedInput.matches(sel));
            requestAnimationFrame(() => {
              const freshInput = document.querySelector('.chat-panel[data-chat-id="' + chat.id + '"] ' + inputSelector);
              if (freshInput) freshInput.focus();
            });
          }
        });

        panel.addEventListener('click', () => {
          if (chat.flashHighlight) {
            chat.flashHighlight = false;
            panel.classList.remove('flash-highlight');
          }
        }, true);

        panelTop.setAttribute('draggable', 'true');
        panelTop.addEventListener('dragstart', (event) => {
          event.dataTransfer.setData('text/plain', chat.id);
          event.dataTransfer.effectAllowed = 'move';
          panel.classList.add('dragging');
        });
        panelTop.addEventListener('dragend', () => {
          panel.classList.remove('dragging');
          document.querySelectorAll('.chat-panel.drop-target').forEach(el => el.classList.remove('drop-target'));
        });
        panel.addEventListener('dragover', (event) => {
          event.preventDefault();
          event.dataTransfer.dropEffect = 'move';
          panel.classList.add('drop-target');
        });
        panel.addEventListener('dragleave', () => {
          panel.classList.remove('drop-target');
        });
        panel.addEventListener('drop', (event) => {
          event.preventDefault();
          panel.classList.remove('drop-target');
          const draggedId = event.dataTransfer.getData('text/plain');
          if (!draggedId || draggedId === chat.id) return;
          const fromIndex = chatState.findIndex(item => item.id === draggedId);
          const toIndex = chatState.findIndex(item => item.id === chat.id);
          if (fromIndex === -1) {
            restoreChat(draggedId);
            return;
          }
          if (toIndex === -1) return;

          const prevRects = {};
          chatGrid.querySelectorAll('.chat-panel').forEach(p => {
            prevRects[p.getAttribute('data-chat-id')] = p.getBoundingClientRect();
          });

          const [moved] = chatState.splice(fromIndex, 1);
          moved.docked = false;
          moved.minimized = false;
          chatState.splice(chatState.indexOf(chat), 0, moved);
          syncChatPositions();
          saveChatOrder();
          chatState.forEach(saveChatToStorage);
          renderChats();
          requestAnimationFrame(() => animateReorder(prevRects));
        });

        const favToggle = panel.querySelector('.fav-toggle');
        favToggle.addEventListener('click', (event) => {
          event.stopPropagation();
          chat.favorite = !chat.favorite;
          saveChatToStorage(chat);
          renderChats();
        });
        const keyToggle = panel.querySelector('.key-toggle');
        keyToggle.addEventListener('click', (event) => {
          event.stopPropagation();
          if (!hasPrivacyPassword()) {
            pendingPrivacyChatId = chat.id;
            openPrivacyPasswordModal();
            return;
          }
          if (chat.isPrivate && !chat.unlocked) {
            return;
          }
          if (chat.isPrivate && chat.unlocked) {
            chat.isPrivate = false;
            chat.unlocked = false;
          } else {
            chat.isPrivate = true;
            chat.unlocked = false;
          }
          saveChatToStorage(chat);
          renderChats();
        });

        const privacyPasswordInput = panel.querySelector('.privacy-password-input');
        const privacyUnlockBtn = panel.querySelector('.privacy-unlock-btn');
        if (privacyPasswordInput && privacyUnlockBtn) {
          privacyPasswordInput.addEventListener('pointerdown', (event) => event.stopPropagation());
          const attemptUnlock = async () => {
            const entered = privacyPasswordInput.value;
            const saved = await loadPrivacyPassword();
            if (saved && entered === saved) {
              if (chat._encryptedMessages) {
                const key = await getPrivacyContentKey();
                const plaintext = await decryptWithKey(key, chat._encryptedMessages);
                try {
                  chat.messages = plaintext ? JSON.parse(plaintext) : [];
                } catch (parseError) {
                  chat.messages = [];
                }
                chat._encryptedMessages = null;
              }
              chat.unlocked = true;
              renderChats();
            } else {
              const errorEl = panel.querySelector('.privacy-overlay-error');
              if (errorEl) errorEl.textContent = 'Contraseña incorrecta.';
              privacyPasswordInput.value = '';
            }
          };
          privacyUnlockBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            attemptUnlock();
          });
          privacyPasswordInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
              event.stopPropagation();
              attemptUnlock();
            }
          });
        }
        const chatInput = panel.querySelector('.chat-message-input');
        const mentionMenu = panel.querySelector('.mention-menu');
        const refreshMentionMenu = () => {
          renderMentionMenu(chat, panel, chatInput);
        };
        chatInput.addEventListener('pointerdown', (event) => event.stopPropagation());
        chatInput.addEventListener('focus', () => {
          if (chat.flashHighlight) {
            chat.flashHighlight = false;
            panel.classList.remove('flash-highlight');
          }
          refreshMentionMenu();
        });
        chatInput.addEventListener('click', refreshMentionMenu);
        chatInput.addEventListener('input', () => {
          chat.draftText = chatInput.value;
          chatInput.style.height = 'auto';
          chatInput.style.height = chatInput.scrollHeight + 'px';
          chatInput.classList.toggle('console-mode', chatInput.value.trim().startsWith('>>>'));
          refreshMentionMenu();
        });
        chatInput.addEventListener('keyup', (event) => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Home' || event.key === 'End') {
            refreshMentionMenu();
          }
        });
        if (chat.editingIndex != null) {
          const editingMessage = chat.messages[chat.editingIndex];
          chatInput.value = editingMessage ? (editingMessage.rawText || editingMessage.content || '') : '';
          chatInput.classList.toggle('console-mode', chatInput.value.trim().startsWith('>>>'));
          requestAnimationFrame(() => {
            chatInput.focus();
            chatInput.select();
          });
        } else {
          if (chat.draftText) {
            chatInput.value = chat.draftText;
            chatInput.style.height = 'auto';
            chatInput.style.height = chatInput.scrollHeight + 'px';
          }
          chatInput.classList.toggle('console-mode', String(chatInput.value || '').trim().startsWith('>>>'));
          if (justGainedFocus) {
            requestAnimationFrame(() => chatInput.focus());
          }
        }

        const attachWrap = panel.querySelector('.panel-attach');
        const attachToggle = panel.querySelector('.attach-toggle');
        const attachFileBtn = panel.querySelector('.attach-file-btn');
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.hidden = true;
        attachWrap.appendChild(fileInput);

        attachToggle.addEventListener('click', (event) => {
          event.stopPropagation();
          const willOpen = !attachWrap.classList.contains('open');
          closePanelActionMenus(willOpen ? attachWrap : null);
          attachWrap.classList.toggle('open');
        });
        attachFileBtn.addEventListener('click', (event) => {
          event.stopPropagation();
          fileInput.click();
        });
        fileInput.addEventListener('change', async () => {
          const file = fileInput.files && fileInput.files[0];
          if (!file) return;
          const content = await readFileAsText(file);
          chat.attachment = { name: file.name, content, url: URL.createObjectURL(file) };
          attachWrap.classList.remove('open');
          renderChats();
        });

        const minBtn = panel.querySelector('.min-btn');
        const maxBtn = panel.querySelector('.max-btn');
        const closeBtn = panel.querySelector('.close-btn');
        const sendBtn = panel.querySelector('.send-btn');
        minBtn.addEventListener('click', (event) => {
          event.stopPropagation();
          minimizeChat(chat.id);
        });
        maxBtn.addEventListener('click', (event) => {
          event.stopPropagation();
          maximizeChat(chat.id);
        });
        closeBtn.addEventListener('click', (event) => {
          event.stopPropagation();
          closeChat(chat.id);
        });
        sendBtn.addEventListener('click', (event) => {
          event.stopPropagation();
          sendMessage(chat.id, panel);
        });

        const historyWrap = panel.querySelector('.panel-history');
        const historyToggle = panel.querySelector('.history-toggle');
        const historyMenu = panel.querySelector('.history-menu');
        function closePanelActionMenus(exceptWrap) {
          [attachWrap, historyWrap, pinsWrap, modeWrap, searchWrap, shareWrap, consoleWrap].forEach(wrap => {
            if (!wrap || wrap === exceptWrap) return;
            wrap.classList.remove('open');
          });
          if (exceptWrap !== searchWrap) {
            clearActiveSearchHighlight();
          }
        }
        historyToggle.addEventListener('click', (event) => {
          event.stopPropagation();
          const willOpen = !historyWrap.classList.contains('open');
          closePanelActionMenus(willOpen ? historyWrap : null);
          historyWrap.classList.toggle('open');
        });
        historyMenu.addEventListener('click', (event) => {
          const item = event.target.closest('.history-item');
          if (!item) return;
          event.stopPropagation();
          const idx = item.getAttribute('data-msg-index');
          const target = panel.querySelector('.panel-body [data-msg-index="' + idx + '"]');
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          historyWrap.classList.remove('open');
        });

        const pinsWrap = panel.querySelector('.panel-pins');
        const pinsToggle = panel.querySelector('.pins-toggle');
        const pinsMenu = panel.querySelector('.pins-menu');
        pinsToggle.addEventListener('click', (event) => {
          event.stopPropagation();
          const willOpen = !pinsWrap.classList.contains('open');
          closePanelActionMenus(willOpen ? pinsWrap : null);
          pinsWrap.classList.toggle('open');
        });
        pinsMenu.addEventListener('click', (event) => {
          const item = event.target.closest('.history-item');
          if (!item) return;
          event.stopPropagation();
          const idx = item.getAttribute('data-msg-index');
          const target = panel.querySelector('.panel-body [data-msg-index="' + idx + '"]');
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          pinsWrap.classList.remove('open');
        });
        chatInput.addEventListener('keydown', (event) => {
          const menuOpen = Boolean(mentionMenu && mentionMenu.classList.contains('open'));
          if (menuOpen) {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault();
              const suggestions = Array.isArray(chat.mentionSuggestions) ? chat.mentionSuggestions : [];
              if (!suggestions.length) return;
              const direction = event.key === 'ArrowDown' ? 1 : -1;
              const nextIndex = ((Number(chat.mentionActiveIndex) || 0) + direction + suggestions.length) % suggestions.length;
              chat.mentionActiveIndex = nextIndex;
              renderMentionMenu(chat, panel, chatInput);
              return;
            }
            if (event.key === 'Enter' || event.key === 'Tab') {
              const suggestions = Array.isArray(chat.mentionSuggestions) ? chat.mentionSuggestions : [];
              if (suggestions.length) {
                event.preventDefault();
                selectMentionSuggestion(chat, panel, Number(chat.mentionActiveIndex) || 0);
                return;
              }
            }
            if (event.key === 'Escape') {
              event.preventDefault();
              hideMentionMenu(panel);
              return;
            }
          }
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage(chat.id, panel);
          }
          if (event.key === 'Escape' && chat.editingIndex != null) {
            chat.editingIndex = null;
            chatInput.value = '';
            renderChats();
          }
        });

        if (mentionMenu) {
          mentionMenu.addEventListener('pointerdown', (event) => event.preventDefault());
          mentionMenu.addEventListener('click', (event) => {
            const item = event.target.closest('.mention-item');
            if (!item) return;
            event.stopPropagation();
            selectMentionSuggestion(chat, panel, Number(item.getAttribute('data-mention-index')) || 0);
          });
        }

        const panelBodyEl = panel.querySelector('.panel-body');
        panelBodyEl.addEventListener('click', async (event) => {
          const indexToggleBtn = event.target.closest('.index-result-toggle');
          const editBtn = event.target.closest('.msg-edit');
          const copyBtn = event.target.closest('.msg-copy');
          const codeCopyBtn = event.target.closest('.code-copy');
          const codeConsoleBtn = event.target.closest('.code-console');
          const pinBtn = event.target.closest('.msg-pin');
          const replicateBtn = event.target.closest('.msg-replicate');
          const replyBtn = event.target.closest('.msg-reply');
          const deleteBtn = event.target.closest('.msg-delete');
          const replyJumpBtn = event.target.closest('.reply-jump-link');
          const attachmentRemoveBtn = event.target.closest('.attachment-remove-btn');
          const contextEditBtn = event.target.closest('.context-edit-btn');
          const replicateContextBtn = event.target.closest('.msg-replicate-context');
          const contextRemoveBtn = event.target.closest('.context-remove-btn');
          const truncEl = event.target.closest('.message-content.truncatable');
          if (indexToggleBtn) {
            event.stopPropagation();
            const section = indexToggleBtn.closest('.index-result-section');
            const body = section ? section.querySelector('.index-result-section-body') : null;
            const icon = indexToggleBtn.querySelector('.index-result-toggle-icon');
            if (!section || !body || !icon) return;
            const willExpand = body.hidden;
            body.hidden = !willExpand ? true : false;
            indexToggleBtn.setAttribute('aria-expanded', willExpand ? 'true' : 'false');
            icon.innerHTML = willExpand ? '&#9650;' : '&#9660;';
            return;
          }
          if (attachmentRemoveBtn) {
            event.stopPropagation();
            chat.attachment = null;
            renderChats();
            return;
          }
          if (replicateContextBtn) {
            event.stopPropagation();
            const text = chat.contextMessage ? (chat.contextMessage.rawText || chat.contextMessage.content || '') : '';
            if (!text) return;
            chat.draftText = text;
            renderChats();
            requestAnimationFrame(() => {
              const freshInput = document.querySelector('.chat-panel[data-chat-id="' + chat.id + '"] .chat-message-input');
              if (freshInput) {
                freshInput.focus();
                freshInput.style.height = 'auto';
                freshInput.style.height = freshInput.scrollHeight + 'px';
              }
            });
            return;
          }
          if (contextEditBtn) {
            event.stopPropagation();
            const text = chat.contextMessage ? (chat.contextMessage.rawText || chat.contextMessage.content || '') : '';
            if (!text) return;
            chat.draftText = '/contexto /resumen-general #' + (chat.name || '');
            chat.editingIndex = null;
            renderChats();
            requestAnimationFrame(() => {
              const freshInput = document.querySelector('.chat-panel[data-chat-id="' + chat.id + '"] .chat-message-input');
              if (freshInput) {
                freshInput.focus();
                freshInput.style.height = 'auto';
                freshInput.style.height = freshInput.scrollHeight + 'px';
                freshInput.setSelectionRange(freshInput.value.length, freshInput.value.length);
              }
            });
            return;
          }
          if (contextRemoveBtn) {
            event.stopPropagation();
            chat.contextMessage = null;
            saveChatToStorage(chat);
            renderChats();
            return;
          }
          const contextMessageEl = event.target.closest('.message.context-message');
          if (contextMessageEl) {
            event.stopPropagation();
            contextMessageEl.classList.toggle('expanded');
            return;
          }
          const showMoreBtn = event.target.closest('.show-more-messages');
          if (showMoreBtn) {
            event.stopPropagation();
            const distanceFromBottom = panelBodyEl.scrollHeight - panelBodyEl.scrollTop;
            chat.revealedOlderCount = (chat.revealedOlderCount || 0) + 1;
            saveChatToStorage(chat);
            renderChats();
            requestAnimationFrame(() => {
              const freshBody = document.querySelector('.chat-panel[data-chat-id="' + chat.id + '"] .panel-body');
              if (freshBody) freshBody.scrollTop = freshBody.scrollHeight - distanceFromBottom;
            });
            return;
          }
          if (replyJumpBtn) {
            event.stopPropagation();
            const idx = replyJumpBtn.getAttribute('data-msg-index');
            const target = panel.querySelector('.panel-body [data-msg-index="' + idx + '"]');
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
          }
          if (replyBtn) {
            event.stopPropagation();
            const idx = Number(replyBtn.getAttribute('data-msg-index'));
            if (!chat.messages[idx]) return;
            chat.replyingToIndex = idx;
            scrollOverrides[chat.id] = panelBodyEl.scrollTop;
            renderChats();
            return;
          }
          if (deleteBtn) {
            event.stopPropagation();
            const idx = Number(deleteBtn.getAttribute('data-msg-index'));
            if (!chat.messages[idx]) return;
            if (!window.confirm('¿Eliminar este mensaje?')) return;
            chat.messages.splice(idx, 1);
            chat.pinnedIndices = chat.pinnedIndices.filter(p => p !== idx).map(p => p > idx ? p - 1 : p);
            chat.expandedIndices = chat.expandedIndices.filter(p => p !== idx).map(p => p > idx ? p - 1 : p);
            if (chat.editingIndex != null) {
              if (chat.editingIndex === idx) chat.editingIndex = null;
              else if (chat.editingIndex > idx) chat.editingIndex -= 1;
            }
            if (chat.replyingToIndex != null) {
              if (chat.replyingToIndex === idx) chat.replyingToIndex = null;
              else if (chat.replyingToIndex > idx) chat.replyingToIndex -= 1;
            }
            saveChatToStorage(chat);
            renderChats();
            return;
          }
          if (pinBtn) {
            event.stopPropagation();
            const idx = Number(pinBtn.getAttribute('data-msg-index'));
            let targetPinned = chat.pinnedIndices;
            if (viewingVersion) {
              if (!Array.isArray(viewingVersion.pinnedIndices)) viewingVersion.pinnedIndices = [];
              targetPinned = viewingVersion.pinnedIndices;
            }
            const pos = targetPinned.indexOf(idx);
            if (pos === -1) targetPinned.push(idx); else targetPinned.splice(pos, 1);
            saveChatToStorage(chat);
            scrollOverrides[chat.id] = panelBodyEl.scrollTop;
            renderChats();
            return;
          }
          if (editBtn) {
            event.stopPropagation();
            const idx = Number(editBtn.getAttribute('data-msg-index'));
            if (!chat.messages[idx]) return;
            chat.editingIndex = idx;
            renderChats();
            return;
          }
          if (copyBtn) {
            event.stopPropagation();
            const idx = Number(copyBtn.getAttribute('data-msg-index'));
            const message = chat.messages[idx];
            const text = message ? (message.rawText || message.content || '') : '';
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(text).catch(() => { });
            }
            return;
          }
          if (replicateBtn) {
            event.stopPropagation();
            const idx = Number(replicateBtn.getAttribute('data-msg-index'));
            const message = activeMessages[idx];
            const text = message ? (message.rawText || message.content || '') : '';
            if (!text) return;
            chat.draftText = text;
            renderChats();
            requestAnimationFrame(() => {
              const freshInput = document.querySelector('.chat-panel[data-chat-id="' + chat.id + '"] .chat-message-input');
              if (freshInput) {
                freshInput.focus();
                freshInput.style.height = 'auto';
                freshInput.style.height = freshInput.scrollHeight + 'px';
              }
            });
            return;
          }
          if (codeCopyBtn) {
            event.stopPropagation();
            const code = codeCopyBtn.getAttribute('data-code') || '';
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(code).catch(() => { });
            }
            return;
          }
          if (codeConsoleBtn) {
            event.stopPropagation();
            const code = codeConsoleBtn.getAttribute('data-code') || '';
            const lang = (codeConsoleBtn.getAttribute('data-lang') || '').toLowerCase();
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(code).catch(() => { });
            }
            if (lang === 'ps' || lang === 'powershell' || lang === 'pwsh' || lang === 'sql') {
              const input = panel.querySelector('.chat-message-input');
              if (input) {
                const execType = lang === 'ps' ? 'powershell' : lang;
                input.value = '>>> exec:' + execType;
                chat.draftText = input.value;
                chat.pendingExecution = {
                  type: execType,
                  code
                };
                saveChatToStorage(chat);
                renderChats();
                requestAnimationFrame(() => {
                  const freshInput = document.querySelector('.chat-panel[data-chat-id="' + chat.id + '"] .chat-message-input');
                  if (freshInput) {
                    freshInput.focus();
                    freshInput.setSelectionRange(freshInput.value.length, freshInput.value.length);
                  }
                });
              }
            }
            return;
          }
          if (truncEl && !event.target.closest('a')) {
            event.stopPropagation();
            const idx = Number(truncEl.getAttribute('data-msg-index'));
            const pos = chat.expandedIndices.indexOf(idx);
            if (pos === -1) chat.expandedIndices.push(idx); else chat.expandedIndices.splice(pos, 1);
            saveChatToStorage(chat);
            scrollOverrides[chat.id] = panelBodyEl.scrollTop;
            renderChats();
          }
        });

        const modeWrap = panel.querySelector('.mode-select');
        const modeToggle = panel.querySelector('.mode-toggle');
        const modeMenu = panel.querySelector('.mode-menu');
        if (modeWrap && modeToggle && modeMenu) {
          modeToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            const willOpen = !modeWrap.classList.contains('open');
            closePanelActionMenus(willOpen ? modeWrap : null);
            modeWrap.classList.toggle('open');
          });
          modeMenu.addEventListener('click', (event) => {
            const item = event.target.closest('.mode-item');
            if (!item) return;
            event.stopPropagation();
            chat.responseMode = item.getAttribute('data-mode') || null;
            modeWrap.classList.remove('open');
            renderChats();
          });
        }

        const searchWrap = panel.querySelector('.panel-search');
        const searchToggle = panel.querySelector('.search-toggle');
        const searchInputEl = panel.querySelector('.search-input');
        const searchPrevBtn = panel.querySelector('.search-prev');
        const searchNextBtn = panel.querySelector('.search-next');
        let searchMatches = [];
        let searchCurrent = -1;
        let searchHighlightedEl = null;

        function clearActiveSearchHighlight() {
          if (searchHighlightedEl) {
            clearHighlightsInElement(searchHighlightedEl);
            searchHighlightedEl = null;
          }
        }

        function recomputeSearchMatches() {
          const query = searchInputEl.value.trim().toLowerCase();
          searchMatches = [];
          searchCurrent = -1;
          if (!query) return;
          chat.messages.forEach((message, i) => {
            if (message.typing) return;
            const plain = (message.rawText || message.content || '').toLowerCase();
            if (plain.includes(query)) searchMatches.push(i);
          });
        }

        function goToSearchMatch(direction) {
          const query = searchInputEl.value.trim();
          if (!query || !searchMatches.length) return;

          let nextIndex;
          if (searchCurrent === -1) {
            nextIndex = searchMatches.length - 1;
          } else if (direction === -1) {
            if (searchCurrent === 0) return;
            nextIndex = searchCurrent - 1;
          } else {
            if (searchCurrent === searchMatches.length - 1) return;
            nextIndex = searchCurrent + 1;
          }

          clearActiveSearchHighlight();
          searchCurrent = nextIndex;
          const msgIdx = searchMatches[searchCurrent];
          const messageEl = panel.querySelector('.panel-body [data-msg-index="' + msgIdx + '"]');
          if (messageEl) {
            messageEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            const contentEl = messageEl.querySelector('.message-content') || messageEl;
            highlightMatchesInElement(contentEl, query);
            searchHighlightedEl = contentEl;
            messageEl.classList.remove('search-flash');
            void messageEl.offsetWidth;
            messageEl.classList.add('search-flash');
            setTimeout(() => messageEl.classList.remove('search-flash'), 850);
          }
        }

        searchToggle.addEventListener('click', (event) => {
          event.stopPropagation();
          const willOpen = !searchWrap.classList.contains('open');
          closePanelActionMenus(willOpen ? searchWrap : null);
          const open = searchWrap.classList.toggle('open');
          if (open) searchInputEl.focus();
          else clearActiveSearchHighlight();
        });
        searchInputEl.addEventListener('pointerdown', (event) => event.stopPropagation());
        searchInputEl.addEventListener('input', () => {
          clearActiveSearchHighlight();
          recomputeSearchMatches();
        });
        searchInputEl.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            if (searchCurrent === -1) recomputeSearchMatches();
            goToSearchMatch(1);
          }
        });
        searchPrevBtn.addEventListener('click', (event) => {
          event.stopPropagation();
          if (searchCurrent === -1) recomputeSearchMatches();
          goToSearchMatch(-1);
        });
        searchNextBtn.addEventListener('click', (event) => {
          event.stopPropagation();
          if (searchCurrent === -1) recomputeSearchMatches();
          goToSearchMatch(1);
        });

        const shareWrap = panel.querySelector('.panel-share');
        const shareToggle = panel.querySelector('.share-toggle');
        const shareMenu = panel.querySelector('.share-menu');
        shareToggle.addEventListener('click', (event) => {
          event.stopPropagation();
          const willOpen = !shareWrap.classList.contains('open');
          closePanelActionMenus(willOpen ? shareWrap : null);
          shareWrap.classList.toggle('open');
        });
        shareMenu.addEventListener('click', (event) => {
          const item = event.target.closest('.share-item');
          if (!item) return;
          event.stopPropagation();
          const kind = item.getAttribute('data-share');
          const shareName = viewingVersion ? (chat.name + ' (' + viewingVersion.label + ')') : chat.name;
          const text = kind === 'pinned'
            ? buildPinnedShareText(activeMessages, activePinnedIndices, shareName, chat.responseMode)
            : buildChatExport(activeMessages, activePinnedIndices, shareName, chat.responseMode);
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).catch(() => { });
          }
          shareWrap.classList.remove('open');
        });

        const cancelReplyBtn = panel.querySelector('.cancel-reply');
        if (cancelReplyBtn) {
          cancelReplyBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            chat.replyingToIndex = null;
            renderChats();
          });
        }

        const consoleWrap = panel.querySelector('.panel-console');
        const consoleToggle = panel.querySelector('.console-toggle');
        const consoleMenu = panel.querySelector('.console-menu');
        consoleToggle.addEventListener('click', (event) => {
          event.stopPropagation();
          const willOpen = !consoleWrap.classList.contains('open');
          closePanelActionMenus(willOpen ? consoleWrap : null);
          consoleWrap.classList.toggle('open');
        });
        consoleMenu.addEventListener('click', async (event) => {
          const cmdItem = event.target.closest('.console-item');
          if (!cmdItem) return;
          event.stopPropagation();
          const command = cmdItem.getAttribute('data-command');
          consoleWrap.classList.remove('open');
          await runConsoleCommand(chat, command);
        });

        const temporalToggle = panel.querySelector('.temporal-toggle');
        temporalToggle.addEventListener('click', (event) => {
          event.stopPropagation();
          chat.temporalMode = !chat.temporalMode;
          if (chat.temporalMode) {
            const expiresAt = Date.now() + TEMPORAL_MESSAGE_TTL;
            chat.messages.forEach(message => {
              if (message && !message.typing) {
                message.expiresAt = expiresAt;
              }
            });
          }
          saveChatToStorage(chat);
          renderChats();
        });

        const versionListEl = panel.querySelector('.version-list');
        if (versionListEl) {
          versionListEl.addEventListener('click', (event) => {
            const closeBtn = event.target.closest('.version-list-close');
            const versionItem = event.target.closest('.version-list-item');
            const deleteBtn = event.target.closest('.version-delete-btn');
            if (closeBtn) {
              event.stopPropagation();
              chat.consoleShowVersions = false;
              chat.consoleShowDelete = false;
              renderChats();
              return;
            }
            if (deleteBtn) {
              event.stopPropagation();
              const versionId = deleteBtn.getAttribute('data-version-id') || null;
              handleDeleteVersionClick(chat, versionId);
              return;
            }
            if (versionItem) {
              event.stopPropagation();
              const versionId = versionItem.getAttribute('data-version-id') || null;
              chat.viewingVersionId = versionId || null;
              chat.consoleShowVersions = false;
              renderChats();
            }
          });
        }

        const backToCurrentVersionBtn = panel.querySelector('.back-to-current-version');
        if (backToCurrentVersionBtn) {
          backToCurrentVersionBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            chat.viewingVersionId = null;
            renderChats();
          });
        }

        const targetContainer = chat.docked ? sidebarDockedChats : chatGrid;
        targetContainer.appendChild(panel);
        const panelBody = panel.querySelector('.panel-body');
        panelBody.style.overflowY = chat.focused ? 'auto' : 'hidden';
        panel.addEventListener('mouseenter', () => {
          if (chat.focused) {
            panelBody.style.overflowY = 'auto';
          }
        });
        panel.addEventListener('mouseleave', () => {
          panelBody.style.overflowY = 'hidden';
        });

        const scrollToBottomBtn = panel.querySelector('.scroll-to-bottom-btn');
        const updateScrollToBottomVisibility = () => {
          const distanceFromBottom = panelBody.scrollHeight - panelBody.scrollTop - panelBody.clientHeight;
          scrollToBottomBtn.hidden = distanceFromBottom < 40;
        };
        panelBody.addEventListener('scroll', updateScrollToBottomVisibility);
        scrollToBottomBtn.addEventListener('click', (event) => {
          event.stopPropagation();
          panelBody.scrollTo({ top: panelBody.scrollHeight, behavior: 'smooth' });
        });

        const powershellBody = panel.querySelector('.panel-powershell-body');
        if (powershellBody) {
          powershellBody.hidden = !chat.powershellPanelOpen;
          if (chat.powershellPanelOpen) {
            ensurePowerShellTerminal(chat, panel);
          }
        }

        requestAnimationFrame(() => {
          if (Object.prototype.hasOwnProperty.call(scrollOverrides, chat.id)) {
            panelBody.scrollTop = scrollOverrides[chat.id];
            delete scrollOverrides[chat.id];
            updateScrollToBottomVisibility();
            return;
          }
          if (chat.editingIndex != null) {
            const target = panelBody.querySelector('[data-msg-index="' + chat.editingIndex + '"]');
            if (target) {
              target.scrollIntoView({ block: 'center' });
              updateScrollToBottomVisibility();
              return;
            }
          }
          if (chat.contextMessage && !chat._contextScrollDone && !isPickerMode) {
            chat._contextScrollDone = true;
            panelBody.scrollTop = 0;
            updateScrollToBottomVisibility();
            return;
          }
          panelBody.scrollTop = panelBody.scrollHeight;
          updateScrollToBottomVisibility();
        });
      });

      renderMinimizedMenu();
      renderFavoritesMenu();
      renderSidebar();
    }

    function renderSidebar() {
      const chats = chatState.filter(chat => !chat.deleted);
      sidebarList.innerHTML = chats.length
        ? chats.map(chat => {
          const icons = (chat.favorite ? '&#9733; ' : '') + (chat.isPrivate ? '&#128274;' : '');
          return '<button type="button" class="sidebar-item' + (chat.focused ? ' active' : '') + '" data-chat-id="' + chat.id + '"><span class="sidebar-item-name">' + escapeHtml(chat.name) + '</span><span class="sidebar-item-icons">' + icons + '</span></button>';
        }).join('')
        : '<div class="empty-state">Sin chats</div>';
    }

    function showChatInWorkspace(id) {
      const chat = chatState.find(item => item.id === id);
      if (!chat) return;
      chat.minimized = false;
      chat.docked = false;
      chatState.forEach(item => {
        item.focused = item.id === id;
        item.flashHighlight = item.id === id;
      });
      saveChatToStorage(chat);
      renderChats();
    }

    function animateReorder(prevRects) {
      chatGrid.querySelectorAll('.chat-panel').forEach(panel => {
        const id = panel.getAttribute('data-chat-id');
        const prev = prevRects[id];
        if (!prev) return;
        const next = panel.getBoundingClientRect();
        const dx = prev.left - next.left;
        const dy = prev.top - next.top;
        if (!dx && !dy) return;
        panel.style.transition = 'none';
        panel.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
        requestAnimationFrame(() => {
          panel.style.transition = 'transform 260ms ease';
          panel.style.transform = '';
        });
      });
    }

    function renderFavoritesMenu() {
      if (!favoritesMenu) return;
      const favorites = chatState.filter(chat => chat.favorite && !chat.deleted);
      favoritesMenu.innerHTML = favorites.length
        ? favorites.map(chat => '<button type="button" class="settings-item" data-chat-id="' + chat.id + '">' + escapeHtml(chat.name) + '</button>').join('')
        : '<div class="empty-state">Sin favoritos</div>';
    }

    function bringChatToFront(id) {
      const idx = chatState.findIndex(item => item.id === id);
      if (idx === -1) return;
      const [chat] = chatState.splice(idx, 1);
      chatState.unshift(chat);
      chatState.forEach(item => {
        item.focused = item.id === id;
        item.flashHighlight = item.id === id;
      });
      syncChatPositions();
      saveChatOrder();
      renderChats();
    }

    function createChats(count = 1) {
      clearAllChatsFromStorage();
      chatState = Array.from({ length: count }, (_, i) => ({
        id: `chat-${Date.now()}-${i}`,
        name: `Chat ${i + 1}`,
        minimized: false,
        docked: false,
        maximized: false,
        closing: false,
        deleted: false,
        focused: i === 0,
        blinked: false,
        messages: [],
        attachment: null,
        editingIndex: null,
        responseMode: 'short',
        pinnedIndices: [],
        expandedIndices: [],
        flashHighlight: false,
        replyingToIndex: null,
        favorite: false,
        isPrivate: false,
        unlocked: false,
        revealedOlderCount: 0,
        versions: [],
        viewingVersionId: null,
        currentSourceLabel: null,
        contextMessage: null,
        statusMessage: null,
        consoleShowVersions: false,
        consoleShowDelete: false,
        temporalMode: false,
        hasBranches: false,
        folderSelection: null,
        folderPanelOpen: false,
        folderPreviewPath: null,
        _powerShellLines: []
      }));
      syncChatPositions();
      chatState.forEach(saveChatToStorage);
      saveChatOrder();
      renderChats();
    }

    async function initChats() {
      const saved = loadChatsFromStorage();
      if (!saved.length) {
        createChats();
        return;
      }
      const dockedSaved = saved.filter(item => item.docked);
      saved.forEach(item => { item.docked = false; });
      const order = loadChatOrder();
      if (order.length) {
        saved.sort((a, b) => {
          const aPos = Number.isFinite(a.positionIndex) ? a.positionIndex : order.findIndex(item => item.name === a.name);
          const bPos = Number.isFinite(b.positionIndex) ? b.positionIndex : order.findIndex(item => item.name === b.name);
          return (aPos === -1 ? order.length : aPos) - (bPos === -1 ? order.length : bPos);
        });
      }
      chatState = saved.map((item, i) => ({
        id: `chat-${Date.now()}-${i}`,
        name: item.name,
        minimized: false,
        docked: false,
        maximized: false,
        closing: false,
        deleted: false,
        focused: i === 0,
        blinked: false,
        messages: Array.isArray(item.messages) ? item.messages : [],
        _encryptedMessages: item.encryptedMessages || null,
        attachment: null,
        editingIndex: null,
        responseMode: 'short',
        pinnedIndices: Array.isArray(item.pinnedIndices) ? item.pinnedIndices : [],
        expandedIndices: Array.isArray(item.expandedIndices) ? item.expandedIndices : [],
        flashHighlight: false,
        replyingToIndex: null,
        favorite: Boolean(item.favorite),
        isPrivate: Boolean(item.isPrivate),
        unlocked: false,
        revealedOlderCount: Number(item.revealedOlderCount) || 0,
        versions: Array.isArray(item.versions) ? item.versions : [],
        viewingVersionId: null,
        currentSourceLabel: typeof item.currentSourceLabel === 'string' ? item.currentSourceLabel : null,
        contextMessage: item.contextMessage || null,
        folderSelection: null,
        folderPanelOpen: Boolean(item.folderPanelOpen),
        folderPreviewPath: typeof item.folderPreviewPath === 'string' ? item.folderPreviewPath : null,
        pinnedFileContext: item.pinnedFileContext || null,
        _powerShellLines: Array.isArray(item.powerShellLines)
          ? item.powerShellLines
              .filter(line => line && typeof line.text === 'string')
              .map(line => ({
                kind: line.kind === 'command' ? 'command' : 'output',
                prefix: line.prefix === 'PS> ' ? 'PS> ' : '',
                text: String(line.text || '')
              }))
          : [],
        storageId: typeof item.storageId === 'string' && item.storageId ? item.storageId : createPersistentChatId(),
        positionIndex: Number.isFinite(item.positionIndex) ? item.positionIndex : i,
        statusMessage: null,
        consoleShowVersions: false,
        consoleShowDelete: false,
        temporalMode: Boolean(item.temporalMode),
        hasBranches: Boolean(item.hasBranches)
      }));
      const folderBrowser = window.nanochatFolderBrowser;
      if (folderBrowser && typeof folderBrowser.restoreDirectorySelection === 'function') {
        await Promise.all(chatState.map(async (chat) => {
          const restored = await folderBrowser.restoreDirectorySelection(storageKey(chat.storageId || chat.name));
          if (!restored) return;
          chat.folderSelection = restored;
          chat.folderPanelOpen = false;
        }));
      }
      dockedSaved.forEach(item => {
        const chat = chatState.find(entry => entry.name === item.name);
        if (chat) chat.docked = true;
      });
      syncChatPositions();
      renderChats();
    }

    function focusChat(id) {
      chatState.forEach(item => {
        item.focused = item.id === id;
        if (item.id === id) item.flashHighlight = false;
      });
      renderChats();
    }

    function minimizeChat(id) {
      const chat = chatState.find(item => item.id === id);
      if (!chat) return;
      chat.minimized = true;
      chat.docked = false;
      chat.maximized = false;
      chat.focused = false;
      renderChats();
      minimizedLauncher.classList.add('open');
      minimizedLauncher.setAttribute('aria-expanded', 'true');
    }

    function maximizeChat(id) {
      const chat = chatState.find(item => item.id === id);
      if (!chat) return;
      const nextState = !chat.maximized;
      chatState.forEach(item => { item.maximized = false; });
      chat.minimized = false;
      chat.maximized = nextState;
      chat.focused = true;
      chatState.forEach(item => { if (item.id !== id) item.focused = false; });
      renderChats();
    }

    function restoreChat(id) {
      const chat = chatState.find(item => item.id === id);
      if (!chat) return;
      chat.minimized = false;
      chat.docked = false;
      chat.maximized = false;
      chat.focused = true;
      chatState.forEach(item => { if (item.id !== id) item.focused = false; });
      renderChats();
      minimizedLauncher.classList.add('open');
      minimizedLauncher.setAttribute('aria-expanded', 'true');
    }

    function closeChat(id) {
      const chat = chatState.find(item => item.id === id);
      if (!chat) return;
      const hasMessages = Array.isArray(chat.messages) && chat.messages.length > 0;
      if (hasMessages && !window.confirm('¿Cerrar el chat "' + chat.name + '"? Esta acción no se puede deshacer.')) return;
      chat.closing = true;
      renderChats();
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        removeWorkspaceThreeBranchesForOwner(chat.name);
        removeChatFromStorage(chat.name);
        chatState = chatState.filter(item => item.id !== id);
        if (chatState.length && !chatState.some(item => item.focused)) {
          chatState[0].focused = true;
        }
        saveChatOrder();
        renderChats();
      }, 260);
    }

    function engineLabel(engine) {
      if (engine === 'gemini') return 'Gemini';
      if (engine === 'groq') return 'Groq';
      if (engine === 'deepseek') return 'DeepSeek';
      return 'OpenAI';
    }

    function getEngineKey(engine) {
      if (engine === 'gemini') return geminiApiKey;
      if (engine === 'groq') return groqApiKey;
      if (engine === 'deepseek') return deepseekApiKey;
      return openAiApiKey;
    }

    async function saveKeysFromModal() {
      const nextOpenAi = apiKeyInput.value.trim();
      const nextGemini = geminiApiKeyInput.value.trim();
      const nextGroq = groqApiKeyInput.value.trim();
      const nextDeepSeek = deepseekApiKeyInput.value.trim();
      if (!nextOpenAi && !nextGemini && !nextGroq && !nextDeepSeek) {
        connectStatus.textContent = 'Ingresa al menos una API key.';
        return;
      }
      if (nextOpenAi) {
        openAiApiKey = nextOpenAi;
        await saveApiKey(nextOpenAi);
      }
      if (nextGemini) {
        geminiApiKey = nextGemini;
        await saveGeminiApiKey(nextGemini);
      }
      if (nextGroq) {
        groqApiKey = nextGroq;
        await saveGroqApiKey(nextGroq);
      }
      if (nextDeepSeek) {
        deepseekApiKey = nextDeepSeek;
        await saveDeepSeekApiKey(nextDeepSeek);
      }
      closeKeyModal();
    }

    async function callOpenAI(messages, apiKey) {
      const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4.1-mini',
          input: messages
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || 'No se pudo conectar con OpenAI.');
      }
      return data.output?.[0]?.content?.find(item => item.type === 'output_text')?.text || data.output_text || 'Respuesta recibida.';
    }

    async function callGemini(messages, apiKey) {
      const contents = messages.map(message => ({
        role: message.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: message.content }]
      }));
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + encodeURIComponent(apiKey),
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents })
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || 'No se pudo conectar con Gemini.');
      }
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Respuesta recibida.';
    }

    async function callGroq(messages, apiKey) {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || 'No se pudo conectar con Groq.');
      }
      return data.choices?.[0]?.message?.content || 'Respuesta recibida.';
    }

    async function callDeepSeek(messages, apiKey) {
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || 'No se pudo conectar con DeepSeek.');
      }
      return data.choices?.[0]?.message?.content || 'Respuesta recibida.';
    }

    async function callExecutor(type, payload) {
      const response = await fetch('http://localhost:3210/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, ...payload })
      });
      const raw = await response.text();
      const data = raw ? JSON.parse(raw) : {};
      if (!response.ok) {
        throw new Error(data.error || data.message || ('No se pudo ejecutar ' + type + '.'));
      }
      return data;
    }

    function loadConnectionProfiles() {
      try {
        const raw = localStorage.getItem(CONNECTION_PROFILES_STORAGE) || '[]';
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        return [];
      }
    }

    function getConnectionProfileById(profileId) {
      const id = String(profileId || '').trim();
      if (!id) return null;
      return loadConnectionProfiles().find(profile => String(profile && profile.id || '').trim() === id) || null;
    }

    function parseLocalExecSyntax(text) {
      const source = String(text || '').trim();
      const match = source.match(/^>>>\s*exec:([a-z0-9_-]+)\s+\$([a-z0-9_-]+)(?:\s*->\s*([\s\S]+))?\s*$/i);
      if (!match) return null;
      return {
        action: 'exec',
        executor: String(match[1] || '').toLowerCase(),
        profileId: String(match[2] || '').trim(),
        afterInstruction: String(match[3] || '').trim() || null
      };
    }

    function buildSqlAfterInstructionContext(profileId, sqlText, resultText) {
      return [
        '---',
        'ACCIÓN EJECUTADA',
        '',
        'Executor:',
        'sql',
        '',
        'Perfil:',
        '$' + profileId,
        '',
        'SQL ejecutado:',
        '```sql',
        String(sqlText || '').trim(),
        '```',
        '',
        'Resultado:',
        String(resultText || '').trim()
      ].join('\n').trim();
    }

    function ensurePowerShellTerminal(chat, panel) {
      if (!chat || !panel) return null;
      const host = panel.querySelector('.powershell-terminal');
      if (!host) return null;
      if (chat._powerShellTerminal && chat._powerShellHost === host) return chat._powerShellTerminal;
      if (chat._powerShellTerminal) {
        try { chat._powerShellTerminal.dispose(); } catch (error) { }
      }
      if (typeof window.Terminal !== 'function') return null;
      const term = new window.Terminal({
        convertEol: true,
        cursorBlink: true,
        fontFamily: 'Consolas, ui-monospace, monospace',
        fontSize: 13,
        theme: {
          background: '#000000',
          foreground: '#ffffff',
          cursor: '#ffffff'
        }
      });
      term.open(host);
      term.clear();
      term.writeln('NanoChat PowerShell');
      term.writeln('Escribe comandos usando >>> en la caja del chat.');
      term.writeln('');
      const history = Array.isArray(chat._powerShellLines) ? chat._powerShellLines : [];
      history.forEach((line) => {
        if (!line || typeof line.text !== 'string') return;
        term.writeln((line.prefix || '') + line.text);
      });
      chat._powerShellTerminal = term;
      chat._powerShellHost = host;
      return term;
    }

    function appendPowerShellLine(chat, panel, text, kind = 'output') {
      if (!chat || !panel || !text) return;
      const term = ensurePowerShellTerminal(chat, panel);
      if (!term) return;
      const value = String(text);
      if (!Array.isArray(chat._powerShellLines)) chat._powerShellLines = [];
      if (kind === 'command') {
        chat._powerShellLines.push({ kind, prefix: 'PS> ', text: value });
        term.writeln('PS> ' + value);
      } else {
        chat._powerShellLines.push({ kind, prefix: '', text: value });
        term.writeln(value);
      }
      try { panel.querySelector('.powershell-terminal')?.scrollIntoView({ block: 'end' }); } catch (error) { }
    }

    function resetPowerShellPrompt(input, chat) {
      if (!input) return;
      input.value = '>>> ';
      if (chat) {
        chat.draftText = '>>> ';
      }
      try {
        input.setSelectionRange(input.value.length, input.value.length);
      } catch (error) { }
      input.classList.toggle('console-mode', true);
    }

    async function sendMessage(chatId, panel) {
      const chat = chatState.find(item => item.id === chatId);
      if (!chat) return;
      const input = panel.querySelector('.chat-message-input');
      const text = input.value.trim();
      if (!text) return;
      const inputRuleState = window.nanochatInputRules && typeof window.nanochatInputRules.evaluate === 'function'
        ? window.nanochatInputRules.evaluate(text)
        : { kind: 'text', text, rawText: text };

      if (inputRuleState.kind === 'command' && inputRuleState.command === 'contexto+') {
        const appendText = String(inputRuleState.argsText || '').trim();
        if (!appendText) {
          setTemporaryChatStatus(chat, 'Debes indicar texto para agregar al contexto.', 4200);
          input.value = '';
          chat.draftText = '';
          return;
        }
        appendToChatContext(chat, appendText);
        chat.focused = true;
        chatState.forEach(item => { if (item.id !== chatId) item.focused = false; });
        input.value = '';
        chat.draftText = '';
        saveChatToStorage(chat);
        renderChats();
        return;
      }

      if (inputRuleState.kind === 'command' && inputRuleState.command === 'contexto') {
        const chainState = splitCommandChainArgs(String(inputRuleState.argsText || ''));
        const contextoArg = String(chainState.commandArgs || '').trim();
        const normalizedCommandText = String(inputRuleState.text || text || '').trim();
        if ((!contextoArg && !chainState.chainText) || /^\/contexto$/i.test(normalizedCommandText)) {
          const currentContext = cloneChatStateValue(chat.contextMessage || null);
          chat.messages.push(buildLocalContextMessage(chat.contextMessage));
          chat.contextMessage = currentContext;
          chat.focused = true;
          chatState.forEach(item => { if (item.id !== chatId) item.focused = false; });
          input.value = '';
          chat.draftText = '';
          renderChats();
          return;
        }
        if (!contextoArg && chainState.chainText) {
          input.value = '';
          chat.draftText = '';
          const currentContextText = String(chat.contextMessage?.rawText || chat.contextMessage?.content || '').trim();
          await executeChainedStagesFromResult(chat, chainState.chainText, currentContextText);
          return;
        }
        const resolvedContextMentions = await resolveMentionedFiles(chat, contextoArg);
        const contextoWithoutMentions = String(contextoArg || '').replace(/@([^\s@]+)/g, ' ').replace(/\s+/g, ' ').trim();
        if (Array.isArray(resolvedContextMentions.files) && resolvedContextMentions.files.length && !contextoWithoutMentions) {
          const mergedContextText = resolvedContextMentions.files
            .map(file => String(file.content || '').trim())
            .filter(Boolean)
            .join('\n\n');
          chat.contextMessage = {
            content: mergedContextText,
            display: formatMarkdown(mergedContextText),
            rawText: mergedContextText
          };
          chat._contextScrollDone = false;
          chat.focused = true;
          chatState.forEach(item => { if (item.id !== chatId) item.focused = false; });
          input.value = '';
          chat.draftText = '';
          saveChatToStorage(chat);
          renderChats();
          return;
        }
        const contextFileMatch = contextoArg.match(/^@([^\s@]+)$/);
        if (contextFileMatch) {
          const contextFile = await resolveFileByMention(chat, contextFileMatch[1]);
          if (!contextFile) {
            setTemporaryChatStatus(chat, 'No encontré ese archivo para usarlo como contexto.', 4200);
            input.value = '';
            chat.draftText = '';
            return;
          }
          const fileContextText = String(contextFile.content || '').trim();
          chat.contextMessage = {
            content: fileContextText,
            display: formatMarkdown(fileContextText),
            rawText: fileContextText
          };
          chat._contextScrollDone = false;
          chat.focused = true;
          chatState.forEach(item => { if (item.id !== chatId) item.focused = false; });
          input.value = '';
          chat.draftText = '';
          saveChatToStorage(chat);
          renderChats();
          return;
        }
        chat.focused = true;
        chatState.forEach(item => { if (item.id !== chatId) item.focused = false; });
        input.value = '';
        chat.draftText = '';
        const directTargetMatch = contextoArg.match(/^#([^\s]+(?:\s+[^\s]+)*)$/);
        const resumenGeneralMatch = contextoArg.match(/^\/resumen-general\s+#([^\s]+(?:\s+[^\s]+)*)$/i);
        const resumenAncladosMatch = contextoArg.match(/^\/resumen-anclados\s+#([^\s]+(?:\s+[^\s]+)*)$/i);

        if (resumenGeneralMatch || resumenAncladosMatch) {
          const targetChatName = String((resumenGeneralMatch || resumenAncladosMatch)[1] || '').trim();
          const targetChat = getChatByName(targetChatName);
          if (!targetChat) {
            setTemporaryChatStatus(chat, 'No encontr� el chat destino #' + targetChatName + '.', 4200);
            return;
          }
          try {
            const summaryType = resumenGeneralMatch ? 'general' : 'anclados';
            const contextoText = await buildChatSummaryText(targetChat, summaryType);
            chat.contextMessage = contextoText
              ? { content: contextoText, display: formatMarkdown(contextoText), rawText: contextoText }
              : null;
            chat._contextScrollDone = false;
            saveChatToStorage(chat);
            renderChats();
            return;
          } catch (error) {
            setTemporaryChatStatus(chat, error && error.message ? error.message : 'No se pudo generar el contexto del chat.', 5200);
            return;
          }
        }

        if (directTargetMatch) {
          const targetChatName = String(directTargetMatch[1] || '').trim();
          const targetChat = getChatByName(targetChatName);
          if (!targetChat) {
            setTemporaryChatStatus(chat, 'No encontr� el chat destino #' + targetChatName + '.', 4200);
            return;
          }
          chat.contextMessage = targetChat.contextMessage
            ? {
                content: targetChat.contextMessage.content || targetChat.contextMessage.rawText || '',
                display: targetChat.contextMessage.display || formatMarkdown(targetChat.contextMessage.content || targetChat.contextMessage.rawText || ''),
                rawText: targetChat.contextMessage.rawText || targetChat.contextMessage.content || ''
              }
            : null;
          chat._contextScrollDone = false;
          saveChatToStorage(chat);
          renderChats();
          return;
        }

        chat.contextMessage = contextoArg
          ? { content: contextoArg, display: formatMarkdown(contextoArg), rawText: contextoArg }
          : null;
        chat._contextScrollDone = false;
        saveChatToStorage(chat);
        renderChats();
        return;
      }

      if (inputRuleState.kind === 'command' && inputRuleState.command === 'mensajes') {
        const chainState = splitCommandChainArgs(String(inputRuleState.argsText || ''));
        const mensajesState = parseMensajesCommandArgs(chainState.commandArgs);
        input.value = '';
        chat.draftText = '';
        if (!mensajesState.selector) {
          chat.messages.push(buildLocalMensajesMessage());
          chat.focused = true;
          chatState.forEach(item => { if (item.id !== chatId) item.focused = false; });
          saveChatToStorage(chat);
          renderChats();
          return;
        }
        const selection = resolveMensajesSelection(chat, mensajesState.selector);
        if (!selection.ok) {
          setTemporaryChatStatus(chat, selection.error || 'No se pudo resolver /mensajes.', 4200);
          return;
        }
        if (chainState.chainText) {
          await executeChainedStagesFromResult(chat, chainState.chainText, String(selection.result || '').trim());
          return;
        }
        const selectedText = String(selection.result || '').trim() || '[Sin contenido]';
        const title = '/mensajes:' + mensajesState.selector;
        const rawText = title + '\n\n```text\n' + selectedText + '\n```';
        chat.messages.push({
          role: 'assistant',
          content: rawText,
          display: '<div class="local-preview-title">' + escapeHtml(title) + '</div>' + formatMarkdown('```text\n' + selectedText + '\n```'),
          rawText,
          isLocalPreviewResult: true,
          isLocalContextResult: true
        });
        chat.focused = true;
        chatState.forEach(item => { if (item.id !== chatId) item.focused = false; });
        saveChatToStorage(chat);
        renderChats();
        return;
      }

      if (inputRuleState.kind === 'command' && inputRuleState.command === 'limpiar') {
        input.value = '';
        chat.draftText = '';
        handleLimpiarCommand(chat);
        return;
      }

      if (inputRuleState.kind === 'command' && inputRuleState.command === 'lienzo') {
        input.value = '';
        chat.draftText = '';
        handleLienzoCommand(chat);
        return;
      }

      const execMatch = text.match(/^>>>\s*exec:([a-z0-9_-]+)\s*\n?([\s\S]*)$/i);
      if (execMatch) {
        const type = String(execMatch[1] || '').toLowerCase();
        const localExec = parseLocalExecSyntax(text);
        const profileId = localExec ? localExec.profileId : '';
        const afterInstruction = localExec ? localExec.afterInstruction : null;
        const pendingExecution = chat.pendingExecution && chat.pendingExecution.type === type ? chat.pendingExecution : null;
        const execMessage = {
          role: 'user',
          content: text,
          display: formatMarkdown(text),
          rawText: text,
          isRule: true,
          isExecutor: true,
          executorType: type
        };
        if (type === 'powershell') execMessage.isPowerShell = true;
        if (chat.temporalMode) execMessage.expiresAt = Date.now() + TEMPORAL_MESSAGE_TTL;
        chat.messages.push(execMessage);
        chat.focused = true;
        chatState.forEach(item => { if (item.id !== chatId) item.focused = false; });
        input.value = '';
        chat.draftText = '';
        saveChatToStorage(chat);
        renderChats();

        if (type === 'sql') {
          if (!profileId) {
            setTemporaryChatStatus(chat, 'Falta el id del perfil: usa >>> exec:sql $ID_PERFIL.', 5200);
            return;
          }
          const profile = getConnectionProfileById(profileId);
          if (!profile) {
            setTemporaryChatStatus(chat, 'No existe el perfil de conexión $' + profileId + '.', 5200);
            return;
          }
          if (!profile.enabled) {
            setTemporaryChatStatus(chat, 'El perfil $' + profileId + ' está deshabilitado.', 5200);
            return;
          }
          if (!pendingExecution) {
            setTemporaryChatStatus(chat, 'No hay SQL pendiente para ejecutar. Usa el botón >_ sobre un bloque SQL.', 5200);
            return;
          }
          if (pendingExecution.type !== 'sql') {
            setTemporaryChatStatus(chat, 'El SQL pendiente no coincide con el ejecutor solicitado.', 5200);
            return;
          }
          const script = String(pendingExecution.code || '');
          if (!script.trim()) {
            setTemporaryChatStatus(chat, 'El bloque SQL pendiente está vacío.', 5200);
            return;
          }

          appendPowerShellLine(chat, panel, '$' + profileId, 'command');
          appendPowerShellLine(chat, panel, script, 'command');

          const typingMessage = { role: 'assistant', typing: true };
          chat.messages.push(typingMessage);
          renderChats();

          try {
            const result = await callExecutor('sql', {
              connection: profile,
              script
            });
            const finalText = result.output || result.stdout || result.stderr || result.message || 'SQL ejecutado sin salida.';
            appendPowerShellLine(chat, panel, finalText, 'output');
            const typingIndex = chat.messages.indexOf(typingMessage);
            const replyMessage = {
              role: 'assistant',
              content: finalText,
              display: formatMarkdown(finalText),
              rawText: finalText,
              isExecutorResult: true,
              executorType: 'sql'
            };
            if (chat.temporalMode) replyMessage.expiresAt = Date.now() + TEMPORAL_MESSAGE_TTL;
            if (typingIndex !== -1) chat.messages[typingIndex] = replyMessage; else chat.messages.push(replyMessage);
            chat.pendingExecution = null;
            saveChatToStorage(chat);
            renderChats();

            if (afterInstruction) {
              const targetMatch = afterInstruction.match(/#([^\s]+)/);
              const targetChatName = targetMatch ? targetMatch[1] : '';
              if (targetChatName) {
                const targetChat = getChatByName(targetChatName);
                if (targetChat) {
                  const contextText = buildSqlAfterInstructionContext(profileId, script, finalText);
                  const syntheticRule = '>> #' + targetChat.name + ' ' + contextText + '\n\n' + afterInstruction;
                  try {
                    await executeRuleMessage(chat, syntheticRule);
                  } catch (afterError) {
                    const afterErrorText = afterError && afterError.message ? afterError.message : 'No se pudo ejecutar la instrucción posterior.';
                    setTemporaryChatStatus(chat, afterErrorText, 5200);
                  }
                } else {
                  setTemporaryChatStatus(chat, 'No encontré el chat destino #' + targetChatName + '.', 4200);
                }
              }
            }
          } catch (error) {
            const errorText = error && error.message ? error.message : 'No se pudo ejecutar SQL.';
            appendPowerShellLine(chat, panel, errorText, 'output');
            const typingIndex = chat.messages.indexOf(typingMessage);
            const errorMessage = {
              role: 'assistant',
              content: errorText,
              display: escapeHtml(errorText),
              rawText: errorText,
              isExecutorResult: true,
              executorType: 'sql'
            };
            if (typingIndex !== -1) chat.messages[typingIndex] = errorMessage; else chat.messages.push(errorMessage);
            saveChatToStorage(chat);
            renderChats();
          }
          return;
        }

        const payloadText = String(execMatch[2] || '').trim() || String(chat.pendingExecution && chat.pendingExecution.type === type ? chat.pendingExecution.code : '').trim();
        if (!payloadText) {
          setTemporaryChatStatus(chat, 'Escribe un comando o script despues de >>> exec:' + type + '.', 4200);
          return;
        }

        appendPowerShellLine(chat, panel, payloadText, 'command');

        const typingMessage = { role: 'assistant', typing: true };
        chat.messages.push(typingMessage);
        renderChats();

        try {
          const result = await callExecutor(type, { command: payloadText });

          if (result.cancelled) {
            const cancelledText = result.message || (type === 'sql' ? 'Ejecucion SQL cancelada.' : 'Ejecucion cancelada.');
            appendPowerShellLine(chat, panel, cancelledText, 'output');
            const typingIndex = chat.messages.indexOf(typingMessage);
            const cancelledMessage = {
              role: 'assistant',
              content: cancelledText,
              display: formatMarkdown(cancelledText),
              rawText: cancelledText,
              isExecutorResult: true,
              executorType: type
            };
            if (type === 'powershell') cancelledMessage.isPowerShellResult = true;
            if (chat.temporalMode) cancelledMessage.expiresAt = Date.now() + TEMPORAL_MESSAGE_TTL;
            if (typingIndex !== -1) chat.messages[typingIndex] = cancelledMessage; else chat.messages.push(cancelledMessage);
            if (type === 'powershell') chat.pendingExecution = null;
            saveChatToStorage(chat);
            renderChats();
            return;
          }

          const finalText = result.output || result.stdout || result.stderr || result.message || 'Comando ejecutado sin salida.';
          appendPowerShellLine(chat, panel, finalText, 'output');
          const typingIndex = chat.messages.indexOf(typingMessage);
          const replyMessage = {
            role: 'assistant',
            content: finalText,
            display: formatMarkdown(finalText),
            rawText: finalText,
            isExecutorResult: true,
            executorType: type
          };
          if (type === 'powershell') replyMessage.isPowerShellResult = true;
          if (chat.temporalMode) replyMessage.expiresAt = Date.now() + TEMPORAL_MESSAGE_TTL;
          if (typingIndex !== -1) chat.messages[typingIndex] = replyMessage; else chat.messages.push(replyMessage);
          if (type === 'powershell') chat.pendingExecution = null;
          saveChatToStorage(chat);
          renderChats();
        } catch (error) {
          const errorText = error && error.message ? error.message : ('No se pudo ejecutar ' + type + '.');
          appendPowerShellLine(chat, panel, errorText, 'output');
          const typingIndex = chat.messages.indexOf(typingMessage);
          const errorMessage = {
            role: 'assistant',
            content: errorText,
            display: escapeHtml(errorText),
            rawText: errorText,
            isExecutorResult: true,
            executorType: type
          };
          if (type === 'powershell') errorMessage.isPowerShellResult = true;
          if (typingIndex !== -1) chat.messages[typingIndex] = errorMessage; else chat.messages.push(errorMessage);
          saveChatToStorage(chat);
          renderChats();
        }
        return;
      }

      if (text.startsWith('>>>')) {
        const psMessage = {
          role: 'user',
          content: text,
          display: formatMarkdown(text),
          rawText: text,
          isRule: true,
          isPowerShell: true
        };
        if (chat.temporalMode) psMessage.expiresAt = Date.now() + TEMPORAL_MESSAGE_TTL;
        chat.messages.push(psMessage);
        chat.focused = true;
        chatState.forEach(item => { if (item.id !== chatId) item.focused = false; });
        resetPowerShellPrompt(input, chat);
        chat.pendingExecution = null;
        saveChatToStorage(chat);
        renderChats();

        const command = text.slice(3).trim();
        if (!command) {
          setTemporaryChatStatus(chat, 'Escribe un comando PowerShell después de >>>.', 4200);
          return;
        }

        appendPowerShellLine(chat, panel, command, 'command');

        const typingMessage = { role: 'assistant', typing: true };
        chat.messages.push(typingMessage);
        renderChats();
        try {
          const result = await callExecutor('powershell', { command });
          if (result.cancelled) {
            const cancelledText = result.message || 'Ejecución cancelada.';
            appendPowerShellLine(chat, panel, cancelledText, 'output');
            const typingIndex = chat.messages.indexOf(typingMessage);
            const cancelledMessage = {
              role: 'assistant',
              content: cancelledText,
              display: formatMarkdown(cancelledText),
              rawText: cancelledText,
              isPowerShellResult: true
            };
            if (chat.temporalMode) cancelledMessage.expiresAt = Date.now() + TEMPORAL_MESSAGE_TTL;
            if (typingIndex !== -1) chat.messages[typingIndex] = cancelledMessage; else chat.messages.push(cancelledMessage);
            resetPowerShellPrompt(input, chat);
            saveChatToStorage(chat);
            renderChats();
            return;
          }

          const finalText = result.output || result.stdout || result.stderr || 'Comando ejecutado sin salida.';
          appendPowerShellLine(chat, panel, finalText, 'output');
          const typingIndex = chat.messages.indexOf(typingMessage);
          const replyMessage = {
            role: 'assistant',
            content: finalText,
            display: formatMarkdown(finalText),
            rawText: finalText,
            isPowerShellResult: true
          };
          if (chat.temporalMode) replyMessage.expiresAt = Date.now() + TEMPORAL_MESSAGE_TTL;
          if (typingIndex !== -1) chat.messages[typingIndex] = replyMessage; else chat.messages.push(replyMessage);
          resetPowerShellPrompt(input, chat);
          saveChatToStorage(chat);
          renderChats();
          return;
        } catch (error) {
          const errorText = error && error.message ? error.message : 'No se pudo ejecutar el comando PowerShell.';
          appendPowerShellLine(chat, panel, errorText, 'output');
          const typingIndex = chat.messages.indexOf(typingMessage);
          const errorMessage = { role: 'assistant', content: errorText, display: escapeHtml(errorText), rawText: errorText, isPowerShellResult: true };
          if (typingIndex !== -1) chat.messages[typingIndex] = errorMessage; else chat.messages.push(errorMessage);
          resetPowerShellPrompt(input, chat);
          saveChatToStorage(chat);
          renderChats();
          return;
        }
      }

      if (text.startsWith('>>')) {
        const ruleMessage = {
          role: 'user',
          content: text,
          display: formatMarkdown(text),
          rawText: text,
          isRule: true
        };
        if (chat.temporalMode) ruleMessage.expiresAt = Date.now() + TEMPORAL_MESSAGE_TTL;
        chat.messages.push(ruleMessage);
        chat.focused = true;
        chatState.forEach(item => { if (item.id !== chatId) item.focused = false; });
        input.value = '';
        chat.draftText = '';
        saveChatToStorage(chat);
        renderChats();
        const handled = await executeRuleMessage(chat, text);
        if (handled) return;
      }

      const ramasParalelasMatch = text.match(/^\/ramas-paralelas(?:\s+([\s\S]*))?$/i);
      if (ramasParalelasMatch) {
        input.value = '';
        chat.draftText = '';
        try {
          await handleBranchCommand(chat, (ramasParalelasMatch[1] || '').trim(), 'parallel');
        } catch (error) {
          const errorText = error && error.message ? error.message : 'No se pudo ejecutar /ramas-paralelas.';
          chat.statusMessage = null;
          setTemporaryChatStatus(chat, errorText, 4200);
        }
        return;
      }

      const ramasSecuencialesMatch = text.match(/^\/ramas-secuenciales(?:\s+([\s\S]*))?$/i);
      if (ramasSecuencialesMatch) {
        input.value = '';
        chat.draftText = '';
        try {
          await handleBranchCommand(chat, (ramasSecuencialesMatch[1] || '').trim(), 'sequential');
        } catch (error) {
          const errorText = error && error.message ? error.message : 'No se pudo ejecutar /ramas-secuenciales.';
          chat.statusMessage = null;
          setTemporaryChatStatus(chat, errorText, 4200);
        }
        return;
      }

      const multiIaMatch = text.match(/^\/multi-ia(?:\s+([\s\S]*))?$/i);
      if (multiIaMatch) {
        input.value = '';
        chat.draftText = '';
        try {
          await handleMultiIaCommand(chat, (multiIaMatch[1] || '').trim());
        } catch (error) {
          const errorText = error && error.message ? error.message : 'No se pudo ejecutar /multi-ia.';
          chat.statusMessage = null;
          setTemporaryChatStatus(chat, errorText, 4200);
        }
        return;
      }

      if (inputRuleState.kind === 'command' && (inputRuleState.command === 'indexar-archivo' || inputRuleState.command === 'indexar-archivos')) {
        const chainState = splitCommandChainArgs(String(inputRuleState.argsText || ''));
        input.value = '';
        chat.draftText = '';
        try {
          const summaryText = await handleIndexarArchivosCommand(chat, chainState.commandArgs);
          if (chainState.chainText && summaryText) {
            await handleIndexedResultChain(chat, chainState.chainText, summaryText);
          }
        } catch (error) {
          const errorText = error && error.message ? error.message : 'No se pudo ejecutar /indexar-archivos.';
          chat.statusMessage = null;
          setTemporaryChatStatus(chat, errorText, 4200);
        }
        return;
      }

      if (inputRuleState.kind === 'command' && (inputRuleState.command === 'indexar-archivo-recursivo' || inputRuleState.command === 'indexar-archivos-recursivo')) {
        const chainState = splitCommandChainArgs(String(inputRuleState.argsText || ''));
        input.value = '';
        chat.draftText = '';
        try {
          const summaryText = await runIndexarArchivosRecursivo(chat, chainState.commandArgs);
          if (chainState.chainText && summaryText) {
            await handleIndexedResultChain(chat, chainState.chainText, summaryText);
          }
        } catch (error) {
          const errorText = error && error.message ? error.message : 'No se pudo ejecutar /indexar-archivos-recursivo.';
          chat.statusMessage = null;
          setTemporaryChatStatus(chat, errorText, 4200);
        }
        return;
      }

      if (inputRuleState.kind === 'command' && inputRuleState.command === 'anclar-archivo') {
        const mentionText = String(inputRuleState.argsText || '').trim();
        if (!mentionText) {
          setTemporaryChatStatus(chat, 'Debes mencionar un archivo para anclarlo.', 4200);
          input.value = '';
          chat.draftText = '';
          return;
        }
        const pinnedFile = await resolveFileByMention(chat, mentionText);
        if (!pinnedFile) {
          setTemporaryChatStatus(chat, 'No encontré ese archivo para anclarlo.', 4200);
          input.value = '';
          chat.draftText = '';
          return;
        }
        chat.pinnedFileContext = pinnedFile;
        input.value = '';
        chat.draftText = '';
        saveChatToStorage(chat);
        renderChats();
        return;
      }

      if (inputRuleState.kind === 'command' && inputRuleState.command === 'branch') {
        input.value = '';
        chat.draftText = '';
        try {
          await handleBranchChatCommand(chat, String(inputRuleState.argsText || '').trim());
        } catch (error) {
          const errorText = error && error.message ? error.message : 'No se pudo ejecutar /branch.';
          chat.statusMessage = null;
          setTemporaryChatStatus(chat, errorText, 4200);
        }
        return;
      }

      if (inputRuleState.kind === 'command' && inputRuleState.command === 'preview') {
        const mentionText = String(inputRuleState.argsText || '').trim();
        input.value = '';
        chat.draftText = '';
        if (!mentionText || !/^@([^\s@]+)$/.test(mentionText)) {
          setTemporaryChatStatus(chat, 'Este mensaje debe ir acompañado de un archivo', 4200);
          return;
        }
        const previewFile = await resolveFileByMention(chat, mentionText.slice(1));
        if (!previewFile) {
          setTemporaryChatStatus(chat, 'No encontré ese archivo para vista previa.', 4200);
          return;
        }
        await openFileInPreviewPanel(chat, previewFile.path);
        return;
      }

      if (inputRuleState.kind === 'chain') {
        const chain = parseChainSyntax(text);
        if (isSilentContextChain(chain)) {
          input.value = '';
          chat.draftText = '';
          await executeChainedStagesFromResult(chat, text, '');
          return;
        }
      }

      if (chat.editingIndex != null) {
        chat.messages = chat.messages.slice(0, chat.editingIndex);
        chat.editingIndex = null;
      }

      if (inputRuleState.kind === 'single-mention') {
        const localFile = await resolveFileByMention(chat, inputRuleState.mention);
        if (localFile) {
          chat.messages.push(buildLocalFilePreviewMessage(localFile));
          chat.attachment = null;
          chat.focused = true;
          chatState.forEach(item => { if (item.id !== chatId) item.focused = false; });
          input.value = '';
          chat.draftText = '';
          saveChatToStorage(chat);
          renderChats();
          return;
        }
      }

      const resolvedMentions = await resolveMentionedFiles(chat, text);
      let userContent = resolvedMentions.text;
      let displayContent = formatMarkdown(text);
      if (chat.attachment && chat.attachment.content) {
        userContent += '\n\n[Archivo adjunto: ' + chat.attachment.name + ']\n' + chat.attachment.content;
        displayContent += '<br><a class="attachment-tag" href="' + chat.attachment.url + '" download="' + escapeHtml(chat.attachment.name) + '" target="_blank" rel="noopener">&#128206; ' + escapeHtml(chat.attachment.name) + '</a>';
      }
      const hasRealMessages = chat.messages.some(message => !message.typing);
      if (!hasRealMessages) {
        if (chat.responseMode === 'short') {
          userContent += '\n\n[responde: respuesta super corta, directa, no inventes/asumas/infieras. Si no tienes el dato exacto, di "no lo sé" o "no tengo acceso". Prohibido usar conocimiento previo o suposiciones.]';
        } else if (chat.responseMode === 'complex') {
          userContent += '\n\n[responde: con detalle, no inventes/asumas/infieras. Si no tienes el dato exacto, di "no lo sé" o "no tengo acceso". Prohibido usar conocimiento previo o suposiciones.]';
        }
      }
      if (chat.replyingToIndex != null && chat.messages[chat.replyingToIndex]) {
        const originIdx = chat.replyingToIndex;
        const originMsg = chat.messages[originIdx];
        const raw = (originMsg.rawText || originMsg.content || '').trim();
        const trunc = raw.length > 20 ? raw.slice(0, 20) + '...' : raw;
        displayContent += '<div class="reply-quote">&#8617; ' + escapeHtml(trunc) + '<button type="button" class="reply-jump-link" data-msg-index="' + originIdx + '">Ir a mensaje origen</button></div>';
      }
      chat.replyingToIndex = null;
      const userMessage = { role: 'user', content: userContent, display: displayContent, rawText: text };
      if (chat.temporalMode) userMessage.expiresAt = Date.now() + TEMPORAL_MESSAGE_TTL;
      chat.messages.push(userMessage);
      chat.attachment = null;
      chat.focused = true;
      chatState.forEach(item => { if (item.id !== chatId) item.focused = false; });
      input.value = '';
      chat.draftText = '';
      saveChatToStorage(chat);
      renderChats();

      if (inputRuleState.kind === 'chain') {
        await executeChainedMessage(chat, text, userMessage);
        return;
      }

      const engineName = engineLabel(selectedEngine);
      const activeKey = getEngineKey(selectedEngine);

      if (!activeKey) {
        chat.messages.push({ role: 'assistant', content: 'Conecta tu API key de ' + engineName + ' para responder.' });
        saveChatToStorage(chat);
        renderChats();
        return;
      }

      const typingMessage = { role: 'assistant', typing: true };
      chat.messages.push(typingMessage);
      renderChats();

      try {
        const engineMessages = chat.messages
          .filter(message => !message.typing && !message.isRule && !message.isPowerShell && !message.isLocalPreviewResult && !isTemporalMessageExpired(message))
          .map(message => ({ role: message.role, content: message.content }));
        if (chat.pinnedFileContext && chat.pinnedFileContext.path) {
          const pinnedFileContext = await resolveFileByMention(chat, chat.pinnedFileContext.path) || chat.pinnedFileContext;
          engineMessages.unshift({
            role: 'user',
            content: '[Archivo anclado: ' + pinnedFileContext.path + ']\n' + (pinnedFileContext.content || '[Contenido no disponible]')
          });
        }
        if (Array.isArray(resolvedMentions.files) && resolvedMentions.files.length) {
          resolvedMentions.files.slice().reverse().forEach(file => {
            engineMessages.unshift({
              role: 'user',
              content: '[Archivo referenciado: ' + file.path + ']\n' + (file.content || '[Contenido no disponible]')
            });
          });
        }
        if (chat.contextMessage && chat.contextMessage.content) {
          engineMessages.unshift({ role: 'user', content: '[Contexto]: ' + chat.contextMessage.content });
        }

        let reply;
        if (selectedEngine === 'gemini') {
          reply = await callGemini(engineMessages, activeKey);
        } else if (selectedEngine === 'groq') {
          reply = await callGroq(engineMessages, activeKey);
        } else if (selectedEngine === 'deepseek') {
          reply = await callDeepSeek(engineMessages, activeKey);
        } else {
          reply = await callOpenAI(engineMessages, activeKey);
        }

        const typingIndex = chat.messages.indexOf(typingMessage);
        const replyMessage = { role: 'assistant', content: reply, display: formatMarkdown(reply), rawText: reply };
        if (chat.temporalMode) replyMessage.expiresAt = Date.now() + TEMPORAL_MESSAGE_TTL;
        if (typingIndex !== -1) chat.messages[typingIndex] = replyMessage; else chat.messages.push(replyMessage);
        chat.blinked = true;
        saveChatToStorage(chat);
        renderChats();
        void ringBell();
        setTimeout(() => {
          chat.blinked = false;
          renderChats();
        }, 900);
      } catch (error) {
        const errorText = error && error.message ? error.message : ('No se pudo conectar con ' + engineName + '.');
        const errorMessage = { role: 'assistant', content: errorText, display: escapeHtml(errorText), rawText: errorText };
        if (chat.temporalMode) errorMessage.expiresAt = Date.now() + TEMPORAL_MESSAGE_TTL;
        const typingIndex = chat.messages.indexOf(typingMessage);
        if (typingIndex !== -1) chat.messages[typingIndex] = errorMessage; else chat.messages.push(errorMessage);
        saveChatToStorage(chat);
        renderChats();
      }
    }

    function formatMarkdown(text) {
      const codeBlocks = [];
      const tableBlocks = [];
      const withPlaceholders = text.replace(/(`{3,})([a-zA-Z0-9_-]*)[ \t]*\n?([\s\S]*?)\1/g, (match, fence, lang, code) => {
        codeBlocks.push({
          lang: String(lang || '').trim().toLowerCase(),
          raw: code.replace(/\n$/, '')
        });
        return ' CODEBLOCK' + (codeBlocks.length - 1) + ' ';
      });

      function parseTableCells(row) {
        return String(row || '')
          .trim()
          .replace(/^\|/, '')
          .replace(/\|$/, '')
          .split('|')
          .map(cell => cell.trim());
      }

      function isTableSeparator(row) {
        const cells = parseTableCells(row);
        return cells.length > 1 && cells.every(cell => /^:?-{3,}:?$/.test(cell));
      }

      function renderTableBlock(block) {
        const rows = String(block || '')
          .split('\n')
          .map(line => line.trim())
          .filter(Boolean);
        if (rows.length < 2 || !rows[0].includes('|') || !isTableSeparator(rows[1])) return escapeHtml(block);
        const header = parseTableCells(rows[0]);
        const bodyRows = rows.slice(2).map(parseTableCells).filter(row => row.length);
        const thead = '<thead><tr>' + header.map(cell => '<th>' + escapeHtml(cell) + '</th>').join('') + '</tr></thead>';
        const tbody = bodyRows.length
          ? '<tbody>' + bodyRows.map(row => '<tr>' + row.map(cell => '<td>' + escapeHtml(cell) + '</td>').join('') + '</tr>').join('') + '</tbody>'
          : '';
        tableBlocks.push('<div class="markdown-table-wrap"><table class="markdown-table">' + thead + tbody + '</table></div>');
        return ' TABLEBLOCK' + (tableBlocks.length - 1) + ' ';
      }

      const withTables = withPlaceholders.replace(
        /(^|\n)(\|[^\n]*\|\n\|(?:\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|\n(?:\|[^\n]*\|\n?)*)/g,
        (match, prefix, block) => prefix + renderTableBlock(block.trim())
      );

      let out = escapeHtml(withTables);

      out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
      out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      out = out.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');
      out = out.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
      const lines = out.split('\n');
      const chunks = [];
      let currentListType = null;
      let listItems = [];
      let orderedStart = 1;

      function flushList() {
        if (!currentListType || !listItems.length) return;
        if (currentListType === 'ol') {
          const startAttr = orderedStart > 1 ? ' start="' + orderedStart + '"' : '';
          chunks.push('<ol' + startAttr + '>' + listItems.join('') + '</ol>');
        } else {
          chunks.push('<ul>' + listItems.join('') + '</ul>');
        }
        currentListType = null;
        listItems = [];
        orderedStart = 1;
      }

      lines.forEach((line, index) => {
        const unorderedMatch = line.match(/^\s*[-*]\s+(.+)$/);
        const orderedMatch = line.match(/^\s*(\d+)\.\s+(.+)$/);
        const trimmed = line.trim();
        const nextNonEmptyLine = lines.slice(index + 1).find(nextLine => nextLine.trim() !== '') || '';

        if (unorderedMatch) {
          if (currentListType !== 'ul') flushList();
          currentListType = 'ul';
          listItems.push('<li>' + unorderedMatch[1] + '</li>');
          return;
        }

        if (orderedMatch) {
          if (currentListType !== 'ol') flushList();
          currentListType = 'ol';
          if (!listItems.length) orderedStart = Number(orderedMatch[1]) || 1;
          listItems.push('<li>' + orderedMatch[2] + '</li>');
          return;
        }

        if (!trimmed) {
          const keepsOrderedList = currentListType === 'ol' && /^\s*\d+\.\s+/.test(nextNonEmptyLine);
          const keepsUnorderedList = currentListType === 'ul' && /^\s*[-*]\s+/.test(nextNonEmptyLine);
          if (keepsOrderedList || keepsUnorderedList) return;
          flushList();
          chunks.push('');
          return;
        }

        flushList();
        chunks.push(line);
      });

      flushList();
      out = chunks.join('<br>');
      out = out.replace(/ TABLEBLOCK(\d+) /g, (match, idx) => tableBlocks[Number(idx)] || '');
      out = out.replace(/ CODEBLOCK(\d+) /g, (match, idx) => {
        const block = codeBlocks[Number(idx)] || { lang: '', raw: '' };
        const raw = block.raw || '';
        const lang = block.lang || '';
        const isConsoleLang = lang === 'sql' || lang === 'ps' || lang === 'powershell' || lang === 'pwsh' || lang === 'shell' || lang === 'bash' || lang === 'zsh';
        const consoleBtn = isConsoleLang
          ? '<button type="button" class="code-console" data-code="' + escapeHtml(raw) + '" data-lang="' + escapeHtml(lang) + '" title="Enviar a consola">&gt;_</button>'
          : '';
        return '<div class="code-block-wrap' + (isConsoleLang ? ' has-console' : '') + '">'
          + consoleBtn
          + '<button type="button" class="code-copy" data-code="' + escapeHtml(raw) + '" title="Copiar comando">&#128203;</button><pre class="code-block"><code>' + escapeHtml(raw) + '</code></pre></div>';
      });
      return out;
    }

    function readFileAsText(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsText(file);
      });
    }

    function ringBell() {


      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const gain = ctx.createGain();
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.value = 880;
      osc2.frequency.value = 1320;
      gain.gain.value = 0.0001;
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc1.start();
      osc2.start();
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);
      osc1.stop(ctx.currentTime + 0.5);
      osc2.stop(ctx.currentTime + 0.5);
    }

    minimizedLauncher.addEventListener('click', () => {
      const open = minimizedLauncher.classList.toggle('open');
      minimizedLauncher.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    document.addEventListener('click', (event) => {
      if (minimizedLauncher && !minimizedLauncher.contains(event.target)) {
        minimizedLauncher.classList.remove('open');
        minimizedLauncher.setAttribute('aria-expanded', 'false');
      }
      document.querySelectorAll('.panel-attach.open, .panel-history.open, .mode-select.open, .panel-pins.open, .panel-share.open, .panel-search.open, .panel-console.open').forEach(el => {
        if (!el.contains(event.target)) el.classList.remove('open');
      });
      document.querySelectorAll('.mention-menu.open').forEach(menu => {
        if (!menu.contains(event.target) && !event.target.closest('.chat-compose-wrap')) {
          menu.classList.remove('open');
          menu.hidden = true;
        }
      });
      if (workspaceSettings && !workspaceSettings.contains(event.target)) {
        workspaceSettings.classList.remove('open');
      }
      if (favoritesWrap && !favoritesWrap.contains(event.target)) {
        favoritesWrap.classList.remove('open');
      }
      if (columnsWrap && !columnsWrap.contains(event.target)) {
        columnsWrap.classList.remove('open');
      }
    });

    if (settingsToggle && workspaceSettings) {
      settingsToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        workspaceSettings.classList.toggle('open');
      });
    }
    newChatBtn.addEventListener('click', () => addNewChat());
    columnsToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      columnsWrap.classList.toggle('open');
    });
    columnsWrap.addEventListener('click', (event) => {
      const item = event.target.closest('.columns-item');
      if (!item) return;
      event.stopPropagation();
      const cols = Number(item.getAttribute('data-cols'));
      chatGridColumns = (cols === 1 || cols === 2) ? cols : 3;
      try { localStorage.setItem(GRID_COLUMNS_STORAGE, String(chatGridColumns)); } catch (error) { }
      columnsWrap.classList.remove('open');
      renderChats();
    });
    if (favoritesToggle && favoritesWrap && favoritesMenu) {
      favoritesToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        renderFavoritesMenu();
        favoritesWrap.classList.toggle('open');
      });
      favoritesMenu.addEventListener('click', (event) => {
        const item = event.target.closest('.settings-item');
        if (!item) return;
        event.stopPropagation();
        const chatId = item.getAttribute('data-chat-id');
        if (!chatId) return;
        favoritesWrap.classList.remove('open');
        bringChatToFront(chatId);
      });
    }
    function renderWorkspaceModeMenu() {
      if (!workspaceModeMenu) return;
      const chat = chatState.find(item => item.focused && !item.deleted);
      if (!chat) {
        workspaceModeMenu.innerHTML = '<div class="empty-state">Sin chat enfocado</div>';
        return;
      }
      workspaceModeMenu.innerHTML = [
        { key: '', label: 'Normal' },
        { key: 'short', label: 'Respuesta corta' },
        { key: 'complex', label: 'Respuesta compleja' }
      ].map(opt => '<button type="button" class="settings-item columns-item" data-mode="' + opt.key + '">' + opt.label + '</button>').join('');
    }
    function setWorkspaceThreeMaximized(nextState) {
      workspaceThreeMaximized = Boolean(nextState);
      workspaceThreeSection?.classList.toggle('maximized', workspaceThreeMaximized);
      mainShell?.classList.toggle('workspace-hidden', workspaceThreeMaximized);
      if (workspaceThreeMaxBtn) {
        workspaceThreeMaxBtn.textContent = workspaceThreeMaximized ? '::' : '□';
        workspaceThreeMaxBtn.title = workspaceThreeMaximized ? 'Restaurar Workspace Three' : 'Maximizar Workspace Three';
      }
      requestAnimationFrame(() => {
        if (workspaceThreeJsPlumb) workspaceThreeJsPlumb.repaintEverything();
      });
      saveWorkspaceThreeToStorage();
    }
    if (workspaceSettingsToggle && workspaceModeWrap && workspaceModeMenu) {
      workspaceSettingsToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        renderWorkspaceModeMenu();
        workspaceModeWrap.classList.toggle('open');
      });
      workspaceModeMenu.addEventListener('click', (event) => {
        const item = event.target.closest('.settings-item');
        if (!item) return;
        event.stopPropagation();
        const chat = chatState.find(item => item.focused && !item.deleted);
        if (!chat) return;
        chat.responseMode = item.getAttribute('data-mode') || null;
        workspaceModeWrap.classList.remove('open');
        renderChats();
      });
    }
    if (workspaceThreeMaxBtn) {
      workspaceThreeMaxBtn.addEventListener('click', () => {
        setWorkspaceThreeMaximized(!workspaceThreeMaximized);
      });
    }
    if (workspaceThreeCloseBtn) {
      workspaceThreeCloseBtn.addEventListener('click', () => {
        setWorkspaceThreeActiveChat(null);
      });
    }
    if (newChatMenuItem) {
      newChatMenuItem.addEventListener('click', () => {
        workspaceSettings?.classList.remove('open');
        addNewChat();
      });
    }
    if (setKeyMenuItem) {
      setKeyMenuItem.addEventListener('click', () => {
        workspaceSettings?.classList.remove('open');
        openKeyModal();
      });
    }
    if (closeKeyModalBtn) closeKeyModalBtn.addEventListener('click', closeKeyModal);
    if (keyModalOverlay) {
      keyModalOverlay.addEventListener('click', (event) => {
        if (event.target === keyModalOverlay) closeKeyModal();
      });
    }
    if (saveKeysBtn) saveKeysBtn.addEventListener('click', saveKeysFromModal);

    if (importChatMenuItem) {
      importChatMenuItem.addEventListener('click', () => {
        workspaceSettings?.classList.remove('open');
        openImportModal();
      });
    }
    if (loadImportBtn) loadImportBtn.addEventListener('click', loadImportedChat);
    if (closeImportModalBtn) closeImportModalBtn.addEventListener('click', closeImportModal);
    if (importModalOverlay) {
      importModalOverlay.addEventListener('click', (event) => {
        if (event.target === importModalOverlay) closeImportModal();
      });
    }

    if (privacyMenuItem) {
      privacyMenuItem.addEventListener('click', () => {
        workspaceSettings?.classList.remove('open');
        pendingPrivacyChatId = null;
        openPrivacyPasswordModal();
      });
    }
    if (savePrivacyPasswordBtn) savePrivacyPasswordBtn.addEventListener('click', savePrivacyPasswordFromModal);
    if (closePrivacyModalBtn) closePrivacyModalBtn.addEventListener('click', closePrivacyPasswordModal);
    if (privacyModalOverlay) {
      privacyModalOverlay.addEventListener('click', (event) => {
        if (event.target === privacyModalOverlay) closePrivacyPasswordModal();
      });
    }

    if (connectionProfilesMenuItem) {
      connectionProfilesMenuItem.addEventListener('click', () => {
        workspaceSettings?.classList.remove('open');
        openConnectionProfilesModal();
      });
    }
    if (connectionProfilesSaveBtn) {
      connectionProfilesSaveBtn.addEventListener('click', saveConnectionProfileFromPanel);
    }
    if (connectionProfilesModalOverlay) {
      connectionProfilesModalOverlay.addEventListener('click', (event) => {
        if (event.target === connectionProfilesModalOverlay) closeConnectionProfilesModal();
      });
    }
    if (connectionProfilesStatus) {
      connectionProfilesStatus.textContent = '';
    }

    function setViewMode(mode) {
      appEl.classList.toggle('sidebar-open', mode === 'sidebar');
      appEl.classList.toggle('footer-hidden', mode === 'sidebar');
      sidebarToggleBtn.classList.toggle('active', mode === 'sidebar');
      footerToggleBtn.classList.toggle('active', mode === 'footer');
    }
    sidebarToggleBtn.addEventListener('click', () => setViewMode('sidebar'));
    footerToggleBtn.addEventListener('click', () => setViewMode('footer'));
    setViewMode(window.matchMedia('(max-width: 640px)').matches ? 'footer' : 'sidebar');
    sidebarList.addEventListener('click', (event) => {

      const item = event.target.closest('.sidebar-item');
      if (!item) return;
      showChatInWorkspace(item.getAttribute('data-chat-id'));
    });

    sidebarDropZone.addEventListener('dragover', (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      sidebarDropZone.classList.add('drop-target');
    });
    sidebarDropZone.addEventListener('dragleave', () => {
      sidebarDropZone.classList.remove('drop-target');
    });
    sidebarDropZone.addEventListener('drop', (event) => {
      event.preventDefault();
      sidebarDropZone.classList.remove('drop-target');
      const draggedId = event.dataTransfer.getData('text/plain');
      if (!draggedId) return;
      const chat = chatState.find(item => item.id === draggedId);
      if (!chat) return;
      chat.minimized = false;
      chat.docked = true;
      chat.maximized = false;
      chat.focused = false;
      saveChatToStorage(chat);
      renderChats();
    });

    chatGrid.addEventListener('dragover', (event) => {
      if (!event.dataTransfer) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    });
    chatGrid.addEventListener('drop', (event) => {
      const draggedId = event.dataTransfer && event.dataTransfer.getData('text/plain');
      if (!draggedId) return;
      event.preventDefault();
      const targetPanel = event.target.closest('.chat-panel');
      if (targetPanel) return;
      restoreChat(draggedId);
    });

    let sidebarResizing = false;
    sidebarResizeHandle.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      sidebarResizing = true;
      sidebarResizeHandle.classList.add('resizing');
      sidebarResizeHandle.setPointerCapture(event.pointerId);
    });
    sidebarResizeHandle.addEventListener('pointermove', (event) => {
      if (!sidebarResizing) return;
      const sidebarRect = sidebar.getBoundingClientRect();
      const width = Math.min(480, Math.max(160, event.clientX - sidebarRect.left));
      appEl.style.setProperty('--sidebar-width', width + 'px');
    });
    const stopSidebarResize = (event) => {
      if (!sidebarResizing) return;
      sidebarResizing = false;
      sidebarResizeHandle.classList.remove('resizing');
      const width = parseFloat(getComputedStyle(appEl).getPropertyValue('--sidebar-width'));
      if (width) {
        try { localStorage.setItem(SIDEBAR_WIDTH_STORAGE, String(Math.round(width))); } catch (error) { }
      }
    };
    sidebarResizeHandle.addEventListener('pointerup', stopSidebarResize);
    sidebarResizeHandle.addEventListener('pointercancel', stopSidebarResize);

    function getChatRowStep() {
      const styles = getComputedStyle(chatGrid);
      const rows = styles.gridTemplateRows.split(' ').map(v => parseFloat(v)).filter(v => !isNaN(v));
      const rowHeight = rows.length ? rows[0] : 560;
      const gapValue = parseFloat(styles.rowGap) || 12;
      return rowHeight + gapValue;
    }

    scrollUpBtn.addEventListener('click', () => {
      mainScroll.scrollBy({ top: -getChatRowStep(), behavior: 'smooth' });
    });
    scrollDownBtn.addEventListener('click', () => {
      mainScroll.scrollBy({ top: getChatRowStep(), behavior: 'smooth' });
    });

    function loadAuthUser() {
      try {
        const raw = localStorage.getItem(AUTH_STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch (error) {
        return null;
      }
    }

    function applyAuthUser() {
      const user = loadAuthUser();
      if (!user) return;
      const label = (user.name || user.email || 'U').trim().charAt(0).toUpperCase() || 'U';
      userBadge.textContent = label;
      userDropdownName.textContent = user.name || 'Usuario';
      userDropdownEmail.textContent = user.email || '';
    }

    userBadge.addEventListener('click', (event) => {
      event.stopPropagation();
      userMenu.classList.toggle('open');
    });
    logoutBtn.addEventListener('click', () => {
      try {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } catch (error) { }
      window.location.href = 'login.html';
    });
    document.addEventListener('click', (event) => {
      if (!userMenu.contains(event.target)) {
        userMenu.classList.remove('open');
      }
    });

    async function bootstrap() {
      if (workspaceThreeSection) workspaceThreeSection.hidden = true;
      applyAuthUser();
      const user = loadAuthUser();
      if (user && user.sub) {
        userCryptoKey = await deriveUserCryptoKey(user.sub);
      }
      openAiApiKey = await loadSavedApiKey();
      geminiApiKey = await loadSavedGeminiApiKey();
      groqApiKey = await loadSavedGroqApiKey();
      deepseekApiKey = await loadSavedDeepSeekApiKey();
      try {
        const savedEngine = localStorage.getItem(ENGINE_STORAGE);
        if (savedEngine === 'openai' || savedEngine === 'gemini' || savedEngine === 'groq' || savedEngine === 'deepseek') {
          selectedEngine = savedEngine;
          engineSelect.value = selectedEngine;
        }
      } catch (error) { }
      try {
        const savedCols = Number(localStorage.getItem(GRID_COLUMNS_STORAGE));
        if (savedCols === 1 || savedCols === 2 || savedCols === 3) chatGridColumns = savedCols;
      } catch (error) { }
      try {
        const savedWidth = Number(localStorage.getItem(SIDEBAR_WIDTH_STORAGE));
        if (savedWidth >= 160 && savedWidth <= 480) {
          appEl.style.setProperty('--sidebar-width', savedWidth + 'px');
        }
      } catch (error) { }
      removeWorkspaceThreeStarterChats();
      initWorkspaceThreeMiniChats();
      initWorkspaceThree();
      initWorkspaceThreeConnections();
      await initChats();
      restoreWorkspaceThreeFromStorage();
    }

    engineSelect.addEventListener('change', () => {
      const value = engineSelect.value;
      selectedEngine = (value === 'gemini' || value === 'groq' || value === 'deepseek') ? value : 'openai';
      try {
        localStorage.setItem(ENGINE_STORAGE, selectedEngine);
      } catch (error) { }
    });

    function pruneExpiredTemporalMessages() {
      const now = Date.now();
      chatState.forEach(chat => {
        const panel = document.querySelector('.chat-panel[data-chat-id="' + chat.id + '"]');
        if (!panel) return;
        chat.messages.forEach((message, index) => {
          if (!message || message.typing) return;
          const expired = Boolean(message.expiresAt && message.expiresAt <= now);
          const messageEl = panel.querySelector('[data-msg-index="' + index + '"]');
          if (!messageEl) return;
          const wrapper = messageEl.classList.contains('message') ? messageEl : messageEl.closest('.message');
          if (wrapper) {
            wrapper.classList.toggle('expired', expired);
          }
        });
      });
    }
    setInterval(pruneExpiredTemporalMessages, 1000);

    bootstrap();
  
