
import { CharContent } from '../types';

export const ZH_CONTENT = {
  ui: {
    title: '摩斯密码 3日通',
    modes: {
      learn: '学习',
      practice: '演练',
      reference: '强化'
    },
    days: {
      d1: '第一天',
      d1_sub: '基础',
      d2: '第二天',
      d2_sub: '进阶',
      d3: '第三天',
      d3_sub: '精通'
    },
    dayPlans: {
      d1_title: '第一天：基础信号',
      d1_desc: '从最简单的对称图形和基本点划开始，建立摩斯密码的直觉。',
      d2_title: '第二天：进阶逻辑',
      d2_desc: '学习通过视觉形状和声音节奏强关联的字符。',
      d3_title: '第三天：精通复杂',
      d3_desc: '攻克最复杂的字符，完成字母表拼图。'
    },
    card: {
      visual: '视觉记忆',
      core: '核心助记',
      ai_title: 'AI 记忆助手',
      ai_placeholder: '输入你的联想线索 (如: H的摩斯码是House的四个角)...',
      ai_btn_generate: 'AI 帮你狠狠记',
      ai_btn_regenerate: '换一个',
      ai_btn_replace: '替换上方助记',
      ai_btn_restore: '恢复系统默认',
      ai_loading: 'AI 正在头脑风暴...',
      next: '下一个',
      prev: '上一个',
      play_sound: '播放声音'
    },
    practice: {
      title: '实战演练',
      modes: {
        visual: '视觉瞬记',
        visual_desc: '看到符号，瞬间反应出对应的字符。',
        audio: '听音破译',
        audio_desc: '只听声音，识别出对应的字符。核心技能！',
        words: '单词解密',
        words_desc: '挑战高频词汇和缩写 (SOS, OK 等)。'
      },
      categories: {
        ABBR: '缩写',
        COMMON: '常用词',
        EMERGENCY: '紧急'
      },
      rank_title: '当前军衔',
      streak: '连胜',
      hint: '提示',
      hint_no_score: '提示 (不计分)',
      input_char: '输入字符...',
      input_word: '输入单词...',
      enter_confirm: '按 Enter 确认',
      replay: '重听',
      back_menu: '返回大厅',
      complete: '训练完成!',
      score: '本次得分'
    },
    game: {
      title: '强化训练',
      audio_title: '听音辨位',
      visual_title: '视觉破译',
      pass: '训练完成！',
      fail: '继续加油！',
      accuracy: '正确率',
      finish: '完成打卡',
      continue: '完成并继续',
      retry: '再练一次'
    },
    reference: {
      title: '信号手册',
      subtitle: '完整的数字、标点与通信缩写数据库。',
      tabs: { num: '数字', sym: '标点', abbr: '缩写与勤务' },
      num_title: '标准数字',
      num_desc: '摩斯数字始终由 5 个符号组成。左栏 1-5 以点开头；右栏 6-0 以划开头。',
      sym_title: '标点符号',
      pro_title: '勤务符号',
      pro_desc: '勤务符号通常作为单个字符发送（字符间无停顿），用于控制通信流程。',
      abbr_title: '常用缩写与Q简语',
      abbr_desc: '在实际电报（CW）通信中，为了提高效率，广泛使用缩写。'
    }
  },
  chars: {
    // Day 1
    'E': { mnemonic: 'E = Easy (容易点)', description: 'E 字母“E” 是摩斯密码中最简单（easy）的字符，其代码仅为一个点（.）快速且容易（easy）发出的短促点音。' },
    'T': { mnemonic: 'T = Table (桌子)', description: 'T 的顶部就是一条平整的长桌面，对应一条长划。' },
    'I': { mnemonic: 'I = Ice (冰)', description: 'I 像一根冰柱，上下两端各凝结着一滴冰珠。冰块融化，“哒哒”落下两滴水。' },
    'M': { mnemonic: 'M = Ma-Ma (妈妈)', description: '喊一声“Ma-Ma”，两个饱满的长音节，刚好对应两段长划。' },
    'A': { mnemonic: 'A = Aim (瞄准)', description: 'A 像个准星。先定点(.)瞄准，然后射出一支长箭(-)。' },
    'N': { mnemonic: 'N = Notification (通知中心)', description: '（-·）仔细看像不像iPhone的刘海屏通知中心状态，-是通知栏，·是摄像头的位置。' },
    'O': { mnemonic: 'O = Oh-My-God (惊叹)', description: '发音 O—M—G—，三个惊讶的长音节，嘴巴张得圆圆的。' },
    'S': { mnemonic: 'S = Snake (蛇)', description: 'S 像一条发出“斯斯斯”声的蛇，弯曲的身体有三个转折点。' },
    'H': { mnemonic: 'H = Hahahaha (哈哈哈哈)', description: '“H”的发音与“哈（ha）”关联。“哈哈哈哈”恰好是四个短促的音节，每个“哈”字都代表摩斯密码中的一个“点”（.）。' },
    // Day 2
    'D': { mnemonic: 'D = Door (门)', description: '听声音像敲门：咚(长)—哒(短)哒(短)。视觉上：左侧-是门把手，右侧两点分别是锁孔(·)和转轴(·)。' },
    'K': { mnemonic: 'K = Kàn (看)', description: '看（Kàn）-·-像是一个带着眼镜的鼻子' },
    'R': { mnemonic: 'R = Racecar (赛车)', description: 'R 是一辆赛车正面的特写。视觉结构对称：左边车灯(·)，中间进气格栅(—)，右边车灯(·)。' },
    'U': { mnemonic: 'U = Uncle Wang的UU球', description: '视觉上：U形大脸，上面两只眼睛(··)下面一张阔嘴(—)。同时 ··-也可以记作“悠悠uu球～”' },
    'W': { mnemonic: 'W = Waves (波浪)', description: 'W 就是波浪的形状。左边起势一个小浪花(·)，紧接着涌起两道大浪(——)。' },
    'G': { mnemonic: 'G = Golf (高尔夫)', description: 'G 像挥杆动作。划出一道长长的弧线(--)，最后收杆击中小球(.)。' },
    'B': { mnemonic: 'B = Bamboo (竹子)', description: 'B的左边是一根长竹干(-)，右边长出了三片竹叶(...)。' },
    'V': { mnemonic: 'V = Victory (胜利)', description: 'Beethoven (命运交响曲): 噔噔噔—当！三短一长。视觉上：三点沿左侧爬坡，右侧一长划登顶。' },
    // Day 3
    'C': { mnemonic: 'C = Chui (吹)', description: '音节记忆：“吹(—)呀(·)吹(—)呀(·)”。视觉上：C 的上方-·和下方-·分别代表嘴吹和吹气时喷出去的口水（·是口水）' },
    'F': { mnemonic: 'F = Flag (旗帜)', description: 'F 像一面飘扬的旗帜。飘动的旗角(·)，旗杆顶端的饰球(·)，长长的旗杆(—)，地面的插孔(·)。' },
    'J': { mnemonic: 'J = Jet (喷气机)', description: '横着看J 的摩斯码像一架喷气式飞机升空。起点(·)是机头，后面拖着三条长长的尾气流(———)。视觉图像是飞机驾驶座椅' },
    'L': { mnemonic: 'L = Leg (腿)', description: 'L 的形状像一只腿（leg）。视觉对应：膝盖(·)、长长的小腿骨(—)、脚后跟(·)、脚尖(·)。' },
    'P': { mnemonic: 'P = Parking (停车场)', description: 'P 像停车场的双柱闸门。左边转轴(·)，左侧横档杆(—)，右侧横档杆(—)，右边转轴(·)。' },
    'Q': { mnemonic: 'Q = Qi-Qiu (气球)', description: 'Q 像个系着绳子的大气球。上面两个气球(—)和(—)，中间打个结(·)，拉根长绳(—)。' },
    'X': { mnemonic: 'X = X-ray (射线)', description: 'X 像两道强力的射线，左边射线(-)、中间的分子结构(··)、右边射线(-)，两边的射线正在击穿分子。' },
    'Y': { mnemonic: 'Y = ¥ (Y字形)', description: '按照人民币符号记忆，“一点钱”-·（一点）--两道杠，组成人民币符号¥，就是-·--的Y' },
    'Z': { mnemonic: 'Z = Zebra (斑马)', description: 'Z 像动物园（ZZOO）里的一匹斑马。（--）是斑马在眯着眼，(··)是办法瘦小的身体。' },
  } as Record<string, CharContent>,
  ref: {
     // Punctuation
    '.': '句号', ',': '逗号', '?': '问号', "'": '撇号', '!': '感叹号', '/': '斜杠',
    '(': '左括号', ')': '右括号', '&': 'Wait', ':': '冒号', ';': '分号', '=': '等号',
    '+': '加号', '-': '连字号', '_': '下划线', '"': '引号', '$': '美元符号', '@': 'At符号',
    // Prosigns
    'SOS': '紧急求救', 'HH': '改错/更正', 'BT': '段落/分隔符 (=)', 'AR': '消息结束 (+)',
    'SK': '通讯结束/再见', 'KA': '开始信号', 'AS': '请稍等/等待',
    // Abbr
    'AA': '某字以后 (All after)', 'AB': '字以前 (All before)', 'ABT': '大约 (About)',
    'ADS': '地址 (Address)', 'AGN': '再一次 (Again)', 'ANT': '天线 (Antenna)',
    'ARRL': '美国无线电中继联盟', 'BN': '......之间 (All between)', 'BUG': '半自动电键 (Semiautomatic key)',
    'C': '是，好 (Yes)', 'CBA': '呼号手册 (Callbook address)', 'CFM': '确认 (Confirm)',
    'CLG': '调用 (Calling)', 'CQ': '调用任意台站 (Calling any station)', 'CUL': '再见 (See you later)',
    'CUZ': '因为 (Because)', 'CW': '连续波 (Continuous wave)', 'CX': '状况 (Conditions)',
    'CY': '抄收 (Copy)', 'DE': '来自 (From)', 'DX': '距离/远程通联 (Distance)',
    'ES': '和；且 (And)', 'FB': '很好/确定 (Fine business)', 'FCC': '联邦通信委员会',
    'FER': '为了 (For)', 'FREQ': '频率 (Frequency)', 'GA': '午安/请发报 (Good afternoon/Go ahead)',
    'GE': '晚安 (Good evening)', 'GM': '早安 (Good morning)', 'GND': '地面/地电位 (Ground)',
    'GUD': '好 (Good)', 'HI': '笑声 (Laughter)', 'HR': '这里 (Here)', 'HV': '有 (Have)',
    'LID': '覆盖 (Lid)', 'MILS': '毫安培 (Milliamperes)', 'NIL': '无收信/空白 (Nothing)',
    'NR': '编号 (Number)', 'OB': '老大哥 (Old boy)', 'OC': '老伙计 (Old chap)',
    'OM': '前辈/男士 (Old man)', 'OO': '官方观察员 (Official Observer)', 'OP': '操作员 (Operator)',
    'OT': '老前辈 (Old timer)', 'OTC': '老手俱乐部', 'PSE': '请 (Please)',
    'PWR': '功率 (Power)', 'R': '收到 (Received)', 'RCVR': '接收机 (Receiver)',
    'RPT': '重复/报告 (Repeat/Report)', 'RST': '信号报告 (Readability-Strength-Tone)',
    'RTTY': '无线电传 (Radioteletype)', 'RX': '接收 (Receive)', 'SAE': '回邮信 (Self addressed envelope)',
    'SASE': '带票回邮信封', 'SED': '说 (Said)', 'SEZ': '说 (Says)',
    'SIG': '信号 (Signal)', 'SIGS': '信号 (Signals)', 'SKED': '行程表 (Schedule)',
    'SN': '很快 (Soon)', 'SRI': '抱歉 (Sorry)', 'STN': '台站 (Station)',
    'TEMP': '温度 (Temperature)', 'TMW': '明天 (Tomorrow)', 'TNX': '谢谢 (Thanks)',
    'TU': '谢谢你 (Thank you)', 'TX': '发射 (Transmit)', 'U': '你 (You)',
    'UR': '你的 (Your)', 'URS': '你的 (Yours)', 'VY': '非常 (Very)',
    'WDS': '词 (Words)', 'WKD': '工作 (Worked)', 'WL': '将会/好 (Will/Well)',
    'WUD': '将会 (Would)', 'WX': '天气 (Weather)', 'XMTR': '发射机 (Transmitter)',
    'XYL': '妻子 (Wife)', 'YL': '女报务员 (Young Lady)', '73': '最好的祝福 (Best regards)',
    '88': '爱与吻 (Love and kisses)', '99': '走开 (Go way - 非友善)',
  } as Record<string, string>
};
