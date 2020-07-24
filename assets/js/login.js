$(function() {
    // 点击去注册页面
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    });
    // 点击去登录的连接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    // 表单的验证
    var form = layui.form
    var layer = layui.layer

    form.verify({
        // 校验密码
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.reg-box [name = "password"]').val()
            if (pwd !== value) return '两次密码不一致'
        }
    })

    // 注册表单的请求
    // 获取表单的提交事件
    $('#form-reg').on('submit', function(e) {
        // 阻止表单提交的默认行为
        e.preventDefault()
        var data = {
            username: $('.reg-box [name=username]').val(),
            password: $('.reg-box [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功,请登录')
            $('#link_login').click()
        })
    })

    // 登录表单的请求
    $('#form-login').on('submit', function(e) {
        // 阻止表单提交的默认行为
        e.preventDefault()

        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })

    })
})