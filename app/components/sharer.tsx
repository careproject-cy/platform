'use client';

import React from 'react';

interface SocialShareProps {
  url?: string;
  text?: string;
  title?: string;
  hashtag?: string;
  hashtags?: string;
  via?: string;
  related?: string;
  inReplyTo?: string;
  to?: string;
  web?: boolean;
  width?: number;
  height?: number;
  isLink?: boolean;
  isBlank?: boolean;
}

const buildQueryString = (params: { [key: string]: string | number | boolean | undefined }): string => {
  const validKeys = Object.keys(params).filter(
    key => params[key] !== undefined && params[key] !== ''
  );
  return validKeys.length > 0
    ? '?' + validKeys.map(key => `${key}=${encodeURIComponent(String(params[key]))}`).join('&')
    : '';
};

interface ShareConfig {
  shareUrl: string;
  getParams: () => { [key: string]: string | number | boolean | undefined };
}

const SocialShare: React.FC<SocialShareProps> = ({
  url = window.location.href,
  text = '',
  title = '',
  hashtag = '',
  hashtags = '',
  via = '',
  related = '',
  inReplyTo = '',
  to = '',
  web = false,
  width = 600,
  height = 480,
  isLink = false,
  isBlank = true,
}) => {
  const shareConfigs: { [key: string]: ShareConfig } = {
    fb: {
      shareUrl: 'https://www.facebook.com/sharer/sharer.php',
      getParams: () => ({
        u: url,
        hashtag: hashtag ? (hashtag.startsWith('#') ? hashtag : `#${hashtag}`) : '',
        quote: text,
      }),
    },
    li: {
      shareUrl: 'https://www.linkedin.com/shareArticle',
      getParams: () => ({
        url,
      }),
    },
    x: {
      shareUrl: 'https://x.com/intent/tweet',
      getParams: () => ({
        text,
        url,
        hashtags,
        via,
        related,
        in_reply_to: inReplyTo,
      }),
    },
    th: {
      shareUrl: 'https://threads.net/intent/post',
      getParams: () => ({
        text: `${text} ${url}`,
      }),
    },
    em: {
      shareUrl: 'mailto:' + to,
      getParams: () => ({
        subject: title,
        body: `${text}\n${url}`,
      }),
    },
    wa: {
      shareUrl: web ? 'https://web.whatsapp.com/send' : 'https://wa.me/',
      getParams: () => ({
        phone: to,
        text: `${text} ${url}`,
      }),
    },
    tg: {
      shareUrl: 'https://t.me/share',
      getParams: () => ({
        text,
        url,
      }),
    },
    re: {
      shareUrl: 'https://www.reddit.com/submit',
      getParams: () => ({
        url,
        title: text,
      }),
    },
  };

  const buildShareUrl = (config: ShareConfig): string => {
    const params = config.getParams();
    const queryString = buildQueryString(params);
    return config.shareUrl + queryString;
  };

  const openShareWindow = (shareUrl: string): void => {
    if (isLink) {
      if (isBlank) {
        window.open(shareUrl, '_blank');
      } else {
        window.location.href = shareUrl;
      }
    } else {
      const left = window.innerWidth / 2 - width / 2 + window.screenX;
      const top = window.innerHeight / 2 - height / 2 + window.screenY;
      const popParams = `scrollbars=no, width=${width}, height=${height}, top=${top}, left=${left}`;
      const newWindow = window.open(shareUrl, '', popParams);
      if (newWindow) {
        newWindow.focus();
      }
    }
  };

  const handleShare = (key: string): void => {
    const config = shareConfigs[key];
    if (!config) return;
    const shareUrl = buildShareUrl(config);
    openShareWindow(shareUrl);
  };

  return (
    <div className="social-share">
      <button onClick={() => handleShare('fb')} title="Share on Facebook">
        Facebook
      </button>
      <button onClick={() => handleShare('li')} title="Share on LinkedIn">
        LinkedIn
      </button>
      <button onClick={() => handleShare('x')} title="Share on X">
        X
      </button>
      <button onClick={() => handleShare('th')} title="Share on Threads">
        Threads
      </button>
      <button onClick={() => handleShare('em')} title="Share via Email">
        Email
      </button>
      <button onClick={() => handleShare('wa')} title="Share on WhatsApp">
        WhatsApp
      </button>
      <button onClick={() => handleShare('tg')} title="Share on Telegram">
        Telegram
      </button>
      <button onClick={() => handleShare('re')} title="Share on Reddit">
        Reddit
      </button>
    </div>
  );
};

export default SocialShare;
