<template>
    <div class='container'>
        <div class='wjy-login-header'>
            <div class='left' @click='handleDisagreeClick'>
                <span class='iconfont'>&#xe6dc;</span>
            </div>
            <div class='title'>注册</div>
            <div></div>
        </div>
        <div class='wjy-register-form'>
            <div class='wjy-register-form-item'>
                <div class='icon'>
                    <img src='./../../assets/icon-1.png' />
                </div>
                <div class='input'>
                    <van-field
                        placeholder="请输入手机号"
                        maxLength='13'
                        v-model='phone'
                        @input='handleInput(1)'
                    />
                </div>
            </div>
            <div class='wjy-register-form-item'>
                <div class='icon'>
                    <img src='./../../assets/icon-2.png' />
                </div>
                <div class='input'>
                    <van-field
                        center
                        clearable
                        v-model='messageCode'
                        maxLength='4'
                        @input='handleInput(2)'
                        placeholder="请输入验证码"
                    />
                </div>
                <div class='button'>
                    <van-button
                        round
                        size="small"
                        type="primary"
                        :disabled='disabled'
                        @click='handleRegistCodeClick'
                    >
                        {{ sendButtonText }}
                    </van-button>          
                </div>
            </div>
            <div class='wjy-register-form-item'>
                <div class='icon'>
                    <img src='./../../assets/icon-3.png' />
                </div>
                <div class='input'>
                    <van-field
                        placeholder="请输入推荐人手机号(选填)"
                        maxLength='13'
                        v-model='inviteMobile'
                        @input='handleInvite'
                    />
                </div>
            </div>
        </div>
        <div class='wjy-registre-btn'>
            <van-button round type="danger" :disabled='loginDisabled' @click='handleRegistClick'>注册</van-button>
        </div>
        <van-popup v-model='popupShow' position='bottom' :close-on-click-overlay='false'>
            <div class='wjy-van-popup'>
                <div class='m-wraper'>
                    <div class='m-title'>
                        <h1>万鲸游服务与隐私协议</h1>
                    </div>
                    <div class='m-container'>
                        <p>
                            “万鲸游”App（以下简称“本产品”）由米袋子信息技术（北京）有限公司负责开发与运营。
                        </p>
                        <p>
                            本协议是用户（以下简称“您”）与米袋子信息技术（北京）有限公司（以下简称“本公司”或“我们”或“平台”）之间的权利义务关系，请您仔细阅读本注册协议，您点击"立即注册"按钮并完成注册程序后，即视为您接受并同意遵守本协议的约定。
                        </p>
                        <p>
                            本协议适用于，用户在使用本公司产品及服务过程中的一切行为，为避免误解，用户成功注册本产品即视为本产品用户，受本协议约束。
                        </p>
                        <ul>
                <li>
                    <h5>
                        第1条 平台服务条款的确认和接纳
                    </h5>
                    <div>
                        <p>
                            1.1平台各项服务的所有权和运营权归万鲸游所有。您同意所有注册协议条款并完成注册程序，才能成为平台的正式用户。您确认：本协议条款是处理双方权利义务的依据，始终有效，法律另有强制性规定或双方另有特别约定的，依其规定或约定。
                        </p>
                        <p>
                            1.2您同意本协议的，即视为您确认自己具有享受平台服务、下单购物等相应的权利能力和行为能力，能够独立承担法律责任。万鲸游将根据法律法规履行实名认证义务，您应该向万鲸游提交真实、完整的身份信息。
                        </p>
                        <p>
                            1.3万鲸游保留在中华人民共和国大陆地区施行之法律允许的范围内拒绝服务、关闭用户账户、清除或编辑内容或取消订单的权利。
                        </p>
                        <p>
                            1.4为表述便利，商品和服务简称为“商品”或“货物”。
                        </p>
                    </div>
                </li>
                <li>
                    <h5>
                        第2条 账户管理
                    </h5>
                    <div>
                        <p>
                            2.1 用户注册本产品时请按照本公司要求准确提供个人信息，并在取得注册账户（下称“该账户”）后及时更新用户准确、最新、完整的身份信息及相关资料。
                        </p>
                        <p>
                            2.2 用户应当使用自身合法的身份信息进行注册，若用户冒用、盗用、拾得他人身份证件办理本公司提供的产品/服务的，用户对此承担所有法律责任；本公司仅对用户的身份信息承担形式审查责任，且仅在自身业务职责范围内承担法律责任。
                        </p>
                        <p>
                            2.3 该账户仅供用户本人使用，用户对使用该账户或密码进行的一切操作及言论负完全的责任。用户须对该账户、密码、身份信息等进行妥善保管，对于因密码、身份信息、校验码等泄露所致的损失由用户自行承担。如用户存在遗失手机或身份证件或银行卡以及其他可能危及本产品账户资金安全或发现有他人冒用或盗用用户的账户登录名及密码或任何其他未经合法授权的情形，应立即以有效方式通知本公司，向本公司申请暂停相关服务。除非另有法律规定或经司法裁判，且征得本公司同意，否则用户不得以任何方式转让、赠与或继承（相关的财产权益除外）其账号及密码等个人信息。
                        </p>
                        <p>
                            2.4 若用户有上述违反本协议约定情形的，产生的任何法律责任均由用户承担，本公司对此不承担任何法律责任。
                        </p>
                        <p>
                            2.5 在需要终止使用本产品时，用户可以申请注销本产品账户，用户应当依照本公司规定的程序进行账户注销。本产品账户注销将导致本公司终止为用户提供本产品及相关服务，本协议约定的双方的权利义务终止，但依本协议其他条款另行约定不得终止的或依其性质不能终止的除外。
                        </p>
                        <p>
                            2.6 存在以下情形的，本公司有权拒绝用户注销账户的申请并应将拒绝理由告知用户： 
                            <p>（1）该账户尚存在未了结的权利义务关系； </p>
                            <p>（2）注销该账户会损害本公司、本公司用户或他人的合法权益； </p>
                            <p>（3）本公司认为不适宜注销该账户的其他情形。</p>
                        </p>
                    </div>
                </li>
                <li>
                    <h5>
                        第3条 服务内容
                    </h5>
                    <div>
                        <p>
                            万鲸游通过互联网依法为用户提供商品查询、商城消费、信用评估、活动专享等服务，您在完全同意本协议及平台相关规定的情况下，方有权使用平台的相关服务。
                        </p>
                        <p>
                            3.1商城服务：用户可浏览万鲸游商城中所有的商品和服务信息。用户登录有效的万鲸游帐号后，可选购各类商品或服务，达成交易。同时，还可以参与万鲸游商城的各项活动，及各类福利体验活动。
                        </p>
                        <p>
                            3.2信用评估：信用评估服务是指万鲸游为用户提供的通过读取和分析用户的个人公开信息、用户授权本公司使用的个人隐私信息及其他授权信息来评估用户信用状况的服务。为使本公司顺利分析与用户信用信息相关的个人信息，用户在此不可撤销地授权本公司采集、读取、分析、使用及处理用户的如下信息：用户的身份信息、用户的手机账单、清单、实名制等信息、用户的银行卡信息、其他有助于本公司授予用户信用额度的信息。
                        </p>
                        <p>
                            3.3活动专享：用户可参与体验万鲸游平台推出的所有活动，包括抽奖活动、购物体验、邀请好友等。
                        </p>
                    </div>
                </li>
                <li>
                    <h5 style='color: red;'>
                        第4条   用户信息收集及保护
                    </h5>
                    <div>
                        <p>
                            4.1您应自行诚信向本平台提供注册资料，您保证提供的注册资料真实、准确、完整、合法有效，您的注册资料如有变动的，应及时更新其注册资料。如果您提供的注册资料不合法、不真实、不准确、不详尽的，您需承担因此引起的相应责任及后果，并且万鲸游保留单方终止您使用万鲸游各项服务的权利。
                        </p>
                        <p>
                            4.2您在本平台进行注册、浏览、下单购物、参加活动、完善资料等行为时，涉及您真实姓名/名称、通信地址、联系电话、电子邮箱、订单详情、投诉内容、cookies等信息的，平台有权从信用评估、完成交易、提供配送、售后及客户服务、开展活动、完成良好的客户体验等多种角度予以收集，并将对其中涉及个人隐私信息予以严格保密，除非得到您的授权、为履行强行性法律义务（如国家安全机关指令）或法律另有规定、本注册协议或其他条款另有约定外，本站不会向外界披露您的隐私信息。
                        </p>
                        <p>
                            4.3您注册成功后，将产生用户名和密码等账户信息，您可以根据平台规定更改您的密码。您应谨慎合理的保存、使用您的账户信息。您若发现任何非法使用您的账户或其他存在安全漏洞的情况的，请立即通知本平台并向公安机关报案。
                        </p>
                        <p>
                            4.4 您同意，万鲸游拥有通过邮件、短信、电话、网站通知或声明等形式，向在本平台注册、购物的用户、收货人发送订单信息、促销活动、售后服务、客户服务等告知信息的权利。如您不希望接收上述信息，可退订。
                        </p>
                        <p>
                            4.5 您同意：您选择向万鲸游提交订单购买商品或服务的，视为您向万鲸游披露个人相关信息，接受万鲸游向您提供商品销售、配送、售后服务、客户服务、数据分析、市场营销帮助或其他必要事宜；如前述全部或部分事宜之一涉及万鲸游外的第三方履行的，万鲸游有权将您的信息以必要方式向第三方披露，第三方有权以履行上述事宜为目的联系您。
                        </p>
                        <p>
                            4.6 您不得将在本平台注册获得的账号、密码等账户信息提供给他人使用，否则您应承担由此产生的全部责任，并与实际使用人承担连带责任。
                        </p>
                        <p style='color: red;'>
                            4.7 使用本产品时，您可通过“账号密码登录”及“短信验证码登录”两种方式进行登录。您同意，使用万鲸游点击登录时，即默认账号信息被记住。当您点击“退出登录”时，即清空个人账号信息。
                        </p>
                        <p style='color: red;'>
                            4.8 您同意，对个人账号、密码、身份信息等进行妥善保管，对于因密码、身份信息、校验码等泄露所致的损失由用户自行承担。当您忘记个人密码时，请点击登录页的“忘记密码”字样，进入找回密码页面，获取手机短信验证码，进行密码重置。
                        </p>
                    </div>
                </li>
                <li>
                    <h5>
                        第5条 用户依法言行义务
                    </h5>
                    <div>
                        <p>
                            本协议依据国家相关法律法规规章制定，您同意严格遵守以下义务：
                        </p>
                        <p>
                            5.1不得传输或发表：煽动抗拒、破坏宪法和法律、行政法规实施的言论，煽动颠覆国家政权，推翻社会主义制度的言论，煽动分裂国家、破坏国家统一的言论，煽动民族仇恨、民族歧视、破坏民族团结的言论；
                        </p>
                        <p>
                            5.2从中国大陆向境外传输资料信息时必须符合中国有关法律法规；
                        </p>
                        <p>
                            5.3不得利用本平台从事洗钱、窃取商业秘密、窃取个人信息等违法犯罪活动；
                        </p>
                        <p>
                            5.4不得干扰本平台的正常运转，不得侵入本平台及国家计算机信息系统；
                        </p>
                        <p>
                            5.5不得传输或发表任何违法犯罪的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、伤害性的、庸俗的，淫秽的、不文明的等信息资料；
                        </p>
                        <p>
                            5.6不得传输或发表损害国家社会公共利益和涉及国家安全的信息资料或言论；
                        </p>
                        <p>
                            5.7不得教唆他人从事本条所禁止的行为；
                        </p>
                        <p>
                            5.8除本注册协议、其他条款或另有其他约定外，您不得利用在本平台注册的账户进行经营活动、牟利行为及其他未经本平台许可的行为，包括但不限于以下行为：
                            <div>
                                <p> （1）您账户内享有的任何万鲸游优惠信息（例如：商品优惠券、折扣等）由万鲸游享有解释权和修改权，您仅享有在万鲸游购物时的使用权，严禁转卖；</p>
                                <p>
                                    （2）恶意利用技术手段或其他方式，为获取优惠、折扣或其他利益而注册账户、下单等行为，影响其他用户正常消费行为或相关合法权益、影响万鲸游正常销售秩序的行为；
                                </p>
                                <p>
                                    （3）发布广告、垃圾邮件；
                                </p>
                                <p>
                                    （4）以再销售或商业使用为目的对本站商品或服务进行购买的；
                                </p>
                                <p>
                                    （5）任何对商品目录、说明、价格、数量、其他用户信息或其他内容的下载、转载、收集、衍生利用、复制、出售、转售或其他形式的使用，无论是否通过Robots、Spiders、自动仪器或手工操作；
                                </p>
                                <p>
                                    （6）本站相关规则、政策、或网页活动规则中限制、禁止的行为；
                                </p>
                                <p>
                                    （7）其他影响万鲸游对用户账户正常管理秩序的行为。
                                </p>
                            </div>
                        </p>
                        <p>
                            5.9您不得利用任何非法手段获取其他用户个人信息，不得将其他用户信息用于任何营利或非营利目的，不得泄露其他用户或权利人的个人隐私，否则万鲸游有权采取本协议规定的合理措施制止您的上述行为，情节严重的，将提交公安机关进行刑事立案。
                        </p>
                        <p>
                            5.10您应不时关注并遵守本平台公布或修改的各类规则规定。平台保有删除站内各类不符合法律政策或不真实的信息内容而无须通知您的权利。
                        </p>
                        <p>
                            5.11若您未遵守以上规定的，本平台有权做出独立判断并采取暂停或冻结、关闭您的账号、关闭相应交易订单、停止发货等措施。您须对自己在网上的行为承担法律责任。
                        </p>
                    </div>
                </li>
                <li>
                    <h5>
                        第6条 商城相关说明
                    </h5>
                    <div>
                        <p>
                            万鲸游商城内的商品价格、数量、是否有货等商品信息随时都有可能发生变动，平台不作特别通知。由于商品信息的数量庞大，虽然本平台会尽最大努力保证您所浏览商品信息的准确性，但由于众所周知的互联网技术因素等客观原因存在，网页显示的信息可能会有一定的滞后性或差错，对此情形望您知悉并理解。
                        </p>
                        <p>
                            由于市场变化及各种以合理商业努力难以控制的因素的影响，本平台无法保证您提交的订单信息中希望购买的商品都会有货；如您下单所购买的商品，发生缺货，您有权取消订单。（若您已付款，我们会为您办理退款。）
                        </p>
                        <p>
                        </p>
                    </div>
                </li>
                <li>
                    <h5>
                        第7条 隐私权保护及授权条款
                    </h5>
                    <div>
                        <p>
                            手机营业厅账号 、个人征信账号 、个人社保账号、个人住房公积金账号、个人电商（包括不限于支付宝、京东等）账号若服务方在获取信息过程中需用户提供相关验证信息（包括不限于手机动态密码、验证码），用户承诺将如实提供。万鲸游有权增减用户需提供的互联网账号，一旦用户提供该等账号，即构成对万鲸游关于该账户互联网信息的使用授权。
                        </p>
                    </div>
                </li>
                <li>
                    <h5>
                        第8条 责任范围及责任限制
                    </h5>
                    <div>
                        <p>
                            8.1 本平台仅对本协议中所列明的义务承担责任。
                        </p>
                        <p>
                            8.2除非另有明确的书面说明，本平台提供给您的全部信息、内容、材料、产品（包括软件）和服务，均是在“按现状”和“按现有”的基础上提供的。
                        </p>
                        <p>
                            8.3 您明确因交易所产生的任何风险应由交易双方承担。
                        </p>
                        <p>
                            8.4 您了解并同意，万鲸游有权应国家有关机关的要求，向其提供您在万鲸游的用户信息和交易记录等必要信息。如您在万鲸游的行为涉嫌侵犯他人合法权益或涉嫌违法，则万鲸游有权在初步判断涉嫌侵权行为可能存在的情况下，向权利人提供您必要的个人信息。
                        </p>
                        <p>
                            <p>
                                您同意，在下列情形下本公司无需承担任何责任： 
                            </p>
                            <p>
                                （1）由于您将万鲸游账户密码告知他人或未保管好自己的密码或与他人共享万鲸游账户或任何其他非本公司的过错，导致您的个人资料泄露。
                            </p>
                            <p>
                                （2）任何由于黑客攻击、计算机病毒侵入或发作、电信部门技术调整导致之影响、因政府管制而造成的暂时性关闭、由于第三方原因(包括不可抗力，例如国际出口的主干线路及国际出口电信提供商一方出现故障、火灾、水灾、雷击、地震、洪水、台风、龙卷风、火山爆发、瘟疫和传染病流行、罢工、战争或暴力行为或类似事件等)及其他非因本公司过错而造成的实名认证信息泄露、丢失、被盗用或被篡改等。 
                            </p>
                            <p>
                                （3）由于与本公司链接或合作的其它网站（如网上银行等）所造成的银行账户信息、身份信息泄露及由此而导致的任何法律争议和后果。 
                            </p>
                            <p>
                                （4）任何万鲸游用户（包括未成年人用户）向本公司提供错误、不完整、不实信息等造成不能通过实名认证或遭受任何其他损失，概与本公司无关。
                            </p>
                        </p>
                    </div>
                </li>
                <li>
                    <h5>
                        第9条 协议更新及用户关注义务
                    </h5>
                    <div>
                        <p>
                            根据国家法律法规变化及网站运营需要，万鲸游有权对本协议条款不时地进行修改，修改后的协议一旦以任何形式公布在平台上即生效，并替代原来的协议。您可随时登陆查阅最新协议；您应不时关注平台公告及协议等相关内容的变动。您知悉并确认，如您不同意更新后的协议，应立即停止接受万鲸游依据新协议提供的服务；如您继续使用本站提供的服务，即视为同意更新后的协议。万鲸游建议您在使用产品之前阅读本协议及平台公告。如果本协议中任何一条被视为废止、无效或因任何理由不可执行，该条应视为可分的且并不影响任何其余条款的有效性和可执行性。
                        </p>
                    </div>
                </li>
                <li>
                    <h5>
                        第10条 法律管辖和适用
                    </h5>
                    <div>
                        <p>
                            本协议的订立、执行和解释及争议的解决均适用在中华人民共和国大陆地区适用之有效法律（但不包括其冲突法规则）。如发生本协议与适用之法律相抵触时，则这些条款将完全按法律规定重新解释，而其他条款继续有效。如缔约方就本协议内容或其执行发生任何争议，双方应尽力友好协商解决；协商不成时，任何一方均可向北京市朝阳区人民法院提起诉讼。
                        </p>
                        <p>
                            3.1商城服务：用户可浏览万鲸游商城中所有的商品和服务信息。用户登录有效的万鲸游帐号后，可选购各类商品或服务，达成交易。同时，还可以参与万鲸游商城的各项活动，及各类福利体验活动。
                        </p>
                        <p>
                            3.2信用评估：信用评估服务是指万鲸游为用户提供的通过读取和分析用户的个人公开信息、用户授权本公司使用的个人隐私信息及其他授权信息来评估用户信用状况的服务。为使本公司顺利分析与用户信用信息相关的个人信息，用户在此不可撤销地授权本公司采集、读取、分析、使用及处理用户的如下信息：用户的身份信息、用户的手机账单、清单、实名制等信息、用户的银行卡信息、其他有助于本公司授予用户信用额度的信息。
                        </p>
                        <p>
                            3.3活动专享：用户可参与体验万鲸游平台推出的所有活动，包括抽奖活动、购物体验、邀请好友等。
                        </p>
                    </div>
                </li>
                <li>
                    <h5>
                        第11条    其他
                    </h5>
                    <div>
                        <p>
                            11.1万鲸游尊重您的合法权利，本协议及平台上发布的各类规则、声明、售后服务政策等其他内容，均是为了更好的、更加便利的为您提供服务。本平台欢迎您和社会各界提出意见和建议，万鲸游将虚心接受并适时修改本协议及本站上的各类规则。
                        </p>
                        <p>
                            11.2本协议内容中以黑体、加粗、下划线、斜体等方式显著标识的条款，请您着重阅读。
                        </p>
                        <p>
                            11.3您同意与万鲸游采用数据电文形式订立本协议，您点击“立即注册”并完成注册程序时，本协议生效，同时您成为平台正式用户。
                        </p>
                    </div>
                </li>
            </ul>
                    </div>
                </div>
                <div class='wjy-van-popou-footer'>
                    <van-button type='default' @click='handleDisagreeClick'>不同意</van-button>
                    <van-button type='danger' @click='hanldeAgreeClick'>同意</van-button>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import fatch from './../../common/js/fatch'
    import Storage from './../../common/js/storage'
    import { commonParams, api } from './../../common/js/config'
    import { trim } from './../../common/js/utils'
    import { isLogin } from './../../common/js/utils'
    export default {
        data() {
            return {
                popupShow: false,
                phone: '',
                messageCode: '',
                inviteMobile: '',
                token: '',
                sendStatus: false,
                sendTime: 120,
                sendButtonText: '发送验证码',
                disabled: true,
                loginDisabled: true
            }
        },
        beforeRouteEnter(to, from, next) {
            if (isLogin()) {
                window.location = '#/mall'
                return;
            } else {
                next();
            }
        },
        beforeCreate() {
            if (isLogin()) {
                this.$router.push({ path: '/mall' });
                return;
            }
        },
        created() {
            setTimeout(() => {
                this.popupShow = true;
            }, 100);
        },
        mounted() {
            this.getSmsToken();
        },
        methods: {
            hanldeAgreeClick() {
                this.popupShow = false;
            },
            handleDisagreeClick() {
                this.$router.back(-1);
            },
            getSmsToken() {
                const url = `${api}basic/getSmsToken`;
                const params = Object.assign({}, commonParams(), {
                   
                });
                fatch(url, 'get', params, (err, state) => {

                }).then((res) => {
                    if (res.code === '0') {
                        this.token = res.data;
                    } else {

                    }
                })
            },
            handleRegistCodeClick() {
                if (this.sendStatus) {
                    return false;
                }
                const url = `${api}user/registCode`;
                const params = Object.assign({}, commonParams(), {
                    phone: trim(this.phone, 1),
                    sign: '',
                    timestamp: new Date().getTime(),
                    token: this.token
                });
                this.sendStatus = true;
                fatch(url, 'get', params, (err, state) => {
                    this.$toast('获取验证码失败！');
                }).then((res) => {
                    if (res.code === '0') {
                        this.sendTime = 120;
                        this.computeSendTime();
                    } else {
                        this.$toast(res.msg);
                        this.sendStatus = false;
                    }
                });
            },
            handleRegistClick() {
                const url = `${api}user/regist`;
                let inviteMobile = trim(this.inviteMobile, 1);
                if (inviteMobile.length !== 0) {
                    if (inviteMobile.length !== 11) {
                        this.$toast('请输入正确的推荐人手机号！');
                        return;
                    }
                }
                const params = Object.assign({}, commonParams(), {
                    channelCode: 'wjygzh',
                    code: this.messageCode,
                    inviteMobile: trim(this.inviteMobile, 1),
                    phone: trim(this.phone, 1),
                    sign: '',
                    timestamp: new Date().getTime(),
                });
                fatch(url, 'get', params, (err, state) => {
                    this.$toast('注册失败！');
                }).then((res) => {
                    if (res.code === '0') {
                        const result = res.data;
                        Storage.set({'user': result});
                        this.$router.push({
                            path: Storage.get('login_path') === '' || Storage.get('login_path') === undefined || Storage.get('login_path') === null ? '/mall' : Storage.get('login_path')
                        })
                    } else {
                        this.$toast(res.msg);
                    }
                });
            },
            handleInput(type) {
                if (type === 1) {
                    this.phone = this.formatNum(this.phone.replace(/\D/g, ''), true);
                    if (this.phone.length === 13) {
                        this.disabled = false;
                    } else {
                        this.disabled = true;
                    }
                }
                if (this.messageCode.length && this.phone.length === 13) {
                    this.loginDisabled = false;
                } else {
                    this.loginDisabled = true;
                }
            },
            handleInvite() {
                this.inviteMobile = this.formatNum(this.inviteMobile.replace(/\D/g, ''), true);
            },
            formatNum(num, isTel, count) {
                isTel = isTel || 0;
                count = count || 4;
                if (isTel) num = '0' + num;
                num = num.replace(new RegExp('\\d{' + count + '}', 'g'), ($0) => $0 + ' ')
                if (isTel) num = num.slice(1).trim();
                return num;
            },
            computeSendTime() {
                if (this.sendStatus) {
                    if (this.sendTime == 0) {
                        this.sendStatus = false;
                        this.sendButtonText = '重新发送'
                    } else {
                        this.sendTime = this.sendTime - 1;
                        this.sendButtonText = this.sendTime + '秒后重新获取';
                        setTimeout(() => {
                            this.computeSendTime();
                        }, 1000);
                   }
                }
            }
        }
    }
</script>

<style lang='stylus' scoped>
.container
    background-color #FBFBFB
    min-height 100vh
    .wjy-login-header
        height 48px
        line-height 48px
        font-size 18px
        display flex
        color #000
        background-color #fff
        border-bottom 1px solid #E2E2E2
        .title
            text-align center
        .left
            padding-left 10px
            box-sizing border-box
        div
            flex 1
    .wjy-register-form
        padding 0 10px
        background-color #fff
        .wjy-register-form-item
            display flex
            border-bottom 1px solid #E2E2E2
            height 44px
            .icon
                width 38px
                img
                    display block
            .input
                flex 1
            .button
                min-width 90px
                text-align center
                height 44px
                line-height 44px
                display flex
                justify-content center
                align-items center
                button
                    display block
                    margin 0 auto
                    background-color #151514
                    border none
                    padding 0 15px
        .wjy-register-form-item:last-child
            border none
    .wjy-registre-btn
        width 100%
        margin-top 30px
        button
            display block
            width 90%
            margin 0 auto
            background-color #DE1E1D
            border none
    .wjy-van-popup
        height 300px
        overflow-y auto
        position relative
        .m-wraper
            padding: 0 .1rem;
            height 300px
            overflow-y auto
            padding-bottom 44px
            box-sizing border-box
            .m-title
                font-size: .5rem;
                padding: .1rem 0;
                text-align: center;
            .m-container
                h5
                    font-size: .4rem;
                p
                    font-size: .3rem;
                ul
                    li
                        list-style: none;
                        h5
                            padding: .1rem 0;
        .wjy-van-popou-footer
            display flex
            position absolute
            bottom 0
            left 0
            right 0
            button
                display block
                width 50%
                border none
</style>